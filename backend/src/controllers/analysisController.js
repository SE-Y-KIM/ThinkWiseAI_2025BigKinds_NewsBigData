const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process')

function run(cmd, opts={}){
  return new Promise((resolve)=>{
    exec(cmd, { timeout: 120000, ...opts }, (error, stdout, stderr)=>{
      resolve({ code: error ? (error.code||1) : 0, stdout, stderr })
    })
  })
}

async function ensurePythonWithYF(){
  const repoRoot = path.resolve(__dirname, '../../')
  const venvPy = path.join(repoRoot, '.venv', 'bin', 'python')
  const envPy = process.env.PYTHON_BIN || process.env.PYTHON_PATH
  const candidates = [envPy, venvPy, 'python3', 'python'].filter(Boolean)
  for (const py of candidates){
    const chk = await run(`${py} -c "import yfinance, pandas, numpy; print('OK')"`)
    if (chk.code===0 && chk.stdout.includes('OK')) return py
  }
  // create venv and install
  await run(`python3 -m venv ${path.join(repoRoot, '.venv')}`)
  await run(`${venvPy} -m pip install --upgrade pip`)
  await run(`${venvPy} -m pip install --no-cache-dir --disable-pip-version-check yfinance pandas numpy`)
  const chk2 = await run(`${venvPy} -c "import yfinance, pandas, numpy; print('OK')"`)
  if (chk2.code===0 && chk2.stdout.includes('OK')) return venvPy
  throw new Error('Failed to prepare Python yfinance environment')
}

function runPython(pythonBin, args){
  return new Promise((resolve)=>{
    const py = spawn(pythonBin, args, { stdio: ['ignore','pipe','pipe'] })
    let out=''; let err=''
    const timer = setTimeout(()=>{ try{ py.kill('SIGKILL') }catch{} }, 120000)
    py.stdout.on('data', d=> out+=d.toString())
    py.stderr.on('data', d=> err+=d.toString())
    py.on('close', code=>{ clearTimeout(timer); resolve({ code, out, err }) })
  })
}

// 간단 주가/뉴스 결합 분석 스켈레톤: 쿼리(q)를 받아 최근 뉴스 요약과 섹터 퍼포먼스, 시세 변화율을 묶어 반환
exports.stockAnalysis = async (req, res) => {
  try {
    const { q = '' } = req.query
    if (!q) return res.status(400).json({ ok:false, error:'q required' })

    // 1) 뉴스 검색 (빅카인즈)
    let news = []
    if (process.env.BIGKINDS_API_KEY) {
      try {
        const url = process.env.BIGKINDS_BASE_URL || 'https://www.bigkinds.or.kr/api/news/search.do'
        const { data } = await axios.post(url, { query: q, pageSize: 5 }, { headers: { Authorization: process.env.BIGKINDS_API_KEY, 'Content-Type':'application/json' }})
        news = (data?.resultList || []).map(n=>({ title: n.title||n.TITLE, press: n.provider||n.PROVIDER, date: n.date||n.PUBLISHED_AT, url:n.url||n.URL, summary:n.summary||n.SUMMARY }))
      } catch (_) {
        news = []
      }
    }

    // 2) 시세 (야후 프록시) - 일부 환경에서 UA 미설정 시 401이 발생할 수 있어 헤더 추가 및 실패 시 무시
    let market = []
    try {
      const yf = process.env.YF_BASE_URL || 'https://query1.finance.yahoo.com/v7/finance/quote'
      const { data } = await axios.get(yf, {
        params: { symbols: '^KS11,USDKRW=X' },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json,text/plain,*/*'
        },
        timeout: 5000
      })
      market = data?.quoteResponse?.result || []
    } catch (e) {
      market = []
    }

    // 3) 차트 데이터 (야후 Chart API)
    const resolveSymbol = (text) => {
      const t = (text||'').toLowerCase()
      if (/삼성전자|samsung/.test(t)) return { symbol: '005930.KS', name: '삼성전자' }
      if (/kospi|코스피|^ks11/.test(t)) return { symbol: '^KS11', name: '코스피' }
      if (/usd|환율|달러/.test(t)) return { symbol: 'USDKRW=X', name: '원/달러 환율' }
      if (/apple|aapl/.test(t)) return { symbol: 'AAPL', name: 'Apple' }
      return { symbol: '^KS11', name: '코스피' }
    }
    const sel = resolveSymbol(q)
    let chart = null
    try {
      const base = process.env.YF_CHART_BASE || 'https://query1.finance.yahoo.com/v8/finance/chart'
      const url = `${base}/${encodeURIComponent(sel.symbol)}`
      const { data } = await axios.get(url, {
        params: { range: '3mo', interval: '1d' },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json,text/plain,*/*'
        },
        timeout: 7000
      })
      const result = data?.chart?.result?.[0]
      const ts = result?.timestamp || []
      const closes = (result?.indicators?.quote?.[0]?.close || []).map(v => (v==null? null : Number(v)))
      const labels = ts.map(t => {
        const d = new Date((t||0) * 1000)
        return `${d.getMonth()+1}/${d.getDate()}`
      })
      // 길이 정합성 보정
      const len = Math.min(labels.length, closes.length)
      chart = {
        title: `${sel.name} 가격 추이`,
        subtitle: '최근 3개월 · 데이터 소스 Yahoo Finance',
        updatedAt: new Date().toISOString().slice(0,10),
        labels: labels.slice(-len),
        series: [ { label: '종가', data: closes.slice(-len) } ]
      }
    } catch (_) {
      chart = null
    }

    // Yahoo 실패 시 Python(yfinance) 폴백
    if (!chart) {
      try {
        const pythonBin = await ensurePythonWithYF()
        const scriptPath = path.resolve(__dirname, '../scripts/chart_series.py')
        const { code, out } = await runPython(pythonBin, [scriptPath, sel.symbol, sel.name])
        if (code===0) {
          const parsed = JSON.parse(out)
          chart = parsed.chart
        }
      } catch (_) { /* ignore */ }
    }

    // 4) OpenAI 요약/키워드/이유 추출 (환경변수 존재 시)
    let ai = null
    if (process.env.OPENAI_API_KEY) {
      try {
        const compact = (news || []).slice(0,5).map(n=>{
          const sum = (n.summary||'').slice(0,80)
          return `- ${n.title} (${n.press||''})${sum?`\n  요약: ${sum}...`:''}`
        }).join('\n')
        const { default: OpenAI } = await import('openai')
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        const prompt = `다음 종목/키워드: "${q}"\n아래 최신 뉴스 헤드라인(요약 포함, 최대 5개)을 근거로, 한국어 JSON만 반환하세요.\n스키마: {"summary": string, "reasons": string[], "keywords": string[], "sentiment": "rise"|"fall"|"neutral"}.\n설명 없이 JSON만 출력.\n헤드라인:\n${compact || '(관련 뉴스 적음)'}\n`
        const completion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 300,
          response_format: { type: 'json_object' }
        })
        const content = completion.choices?.[0]?.message?.content || '{}'
        try { ai = JSON.parse(content) } catch (_) { ai = { summary: content } }
      } catch (err) {
        ai = null
      }
    }

    // 5) 꼬리질문 생성: 모델이 제공하면 사용, 없으면 키워드/룰베이스로 대체
    let followUps = []
    if (ai?.followUps?.length) followUps = ai.followUps
    else if (ai?.keywords?.length) {
      followUps = ai.keywords.slice(0,3).map(k => `${k}의 향후 전망은?`)
    } else {
      followUps = [
        `${sel.name}의 단기 모멘텀은 무엇인가?`,
        `${sel.name} 실적 전망과 리스크는?`,
        `${sel.name} 경쟁사와 비교해 강점은?`
      ]
    }

    res.json({ ok:true, q, news, market, ai: ai ? { ...ai, followUps } : { followUps }, chart })
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message })
  }
}



const axios = require('axios')

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

    // 3) OpenAI 요약/키워드/이유 추출 (환경변수 존재 시)
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

    res.json({ ok:true, q, news, market, ai })
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message })
  }
}



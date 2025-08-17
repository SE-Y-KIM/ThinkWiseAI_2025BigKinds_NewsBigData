const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const { exec } = require('child_process')
const { default: axiosLib } = require('axios')

// code: 지표 코드, provider: 'ECOS' | 'KOSIS' | 'WB', start/end 등
exports.getSeries = async (req, res) => {
  try {
    const { provider = 'ECOS', code, start = '2020', end = '2025' } = req.query
    if (!code) return res.status(400).json({ ok: false, error: 'code required' })

    if (provider === 'ECOS') {
      if (!process.env.ECOS_API_KEY) return res.status(400).json({ ok: false, error: 'ECOS_API_KEY missing' })
      // 예시 엔드포인트(실사용 시 가이드를 참고하여 경로 구성)
      const base = process.env.ECOS_BASE_URL || 'https://ecos.bok.or.kr/api/StatisticSearch'
      const url = `${base}/${process.env.ECOS_API_KEY}/json/kr/1/100/${code}/${start}/${end}`
      const { data } = await axios.get(url)
      return res.json({ ok: true, provider: 'ECOS', data })
    }

    if (provider === 'KOSIS') {
      if (!process.env.KOSIS_API_KEY) return res.status(400).json({ ok: false, error: 'KOSIS_API_KEY missing' })
      const base = process.env.KOSIS_BASE_URL || 'https://kosis.kr/openapi/statisticsData.do'
      const { data } = await axios.get(base, { params: { apiKey: process.env.KOSIS_API_KEY, tblId: code, startPrdDe: start, endPrdDe: end, format: 'json' } })
      return res.json({ ok: true, provider: 'KOSIS', data })
    }

    if (provider === 'WB') {
      const base = process.env.WB_BASE_URL || 'https://api.worldbank.org/v2/country/KR/indicator'
      const { data } = await axios.get(`${base}/${code}?downloadformat=json`)
      return res.json({ ok: true, provider: 'WB', data })
    }

    return res.status(400).json({ ok: false, error: 'unknown provider' })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

// yfinance를 사용해 KOSPI/US10Y/WTI/USDKRW 요약 KPI를 반환
async function pathExists(p){
  try { await fs.promises.access(p, fs.constants.X_OK); return true } catch { return false }
}

function run(cmd, opts={}){
  return new Promise((resolve)=>{
    exec(cmd, { timeout: 120000, ...opts }, (error, stdout, stderr)=>{
      resolve({ code: error ? (error.code||1) : 0, stdout, stderr, error })
    })
  })
}

async function ensurePythonWithYF(){
  // 1) 환경변수 우선
  const envPy = process.env.PYTHON_BIN || process.env.PYTHON_PATH
  const repoRoot = path.resolve(__dirname, '../../')
  const venvPy = path.join(repoRoot, '.venv', 'bin', 'python')
  const candidates = [envPy, venvPy, 'python3', 'python'].filter(Boolean)

  for (const py of candidates){
    // yfinance 가 설치되어 있으면 바로 사용
    const chk = await run(`${py} -c "import yfinance, pandas, numpy; print('OK')"`)
    if (chk.code === 0 && chk.stdout.includes('OK')) return py
  }

  // 2) .venv 만들고 설치 시도
  if (!(await pathExists(venvPy))){
    await run(`python3 -m venv ${path.join(repoRoot, '.venv')}`)
  }
  // 업그레이드 및 설치
  await run(`${venvPy} -m pip install --upgrade pip`, { env: process.env })
  await run(`${venvPy} -m pip install --no-cache-dir --disable-pip-version-check yfinance pandas numpy`, { env: process.env })
  const chk2 = await run(`${venvPy} -c "import yfinance, pandas, numpy; print('OK')"`)
  if (chk2.code === 0 && chk2.stdout.includes('OK')) return venvPy
  throw new Error('Failed to prepare Python yfinance environment')
}

function runPythonScript(pythonBin, scriptPath){
  return new Promise((resolve)=>{
    const py = spawn(pythonBin, [scriptPath], { stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    const timer = setTimeout(()=>{ try{ py.kill('SIGKILL') }catch{} }, 120000)
    py.stdout.on('data', (d)=> out += d.toString())
    py.stderr.on('data', (d)=> err += d.toString())
    py.on('close', (code)=>{ clearTimeout(timer); resolve({ code, out, err }) })
  })
}

exports.getKpi = async (req, res) => {
  try {
    const pythonBin = process.env.PYTHON_BIN || await ensurePythonWithYF()
    const scriptPath = path.resolve(__dirname, '../scripts/macro_kpi.py')
    const cacheKey = 'macro_kpi_cache.json'
    const cachePath = path.resolve(__dirname, '../../.cache', cacheKey)
    // 캐시 디렉토리 보장
    try{ await fs.promises.mkdir(path.dirname(cachePath), { recursive: true }) }catch{}

    // 캐시 유효성 60초
    try{
      const stat = await fs.promises.stat(cachePath)
      const age = Date.now() - stat.mtimeMs
      if (age < 60_000){
        const cached = JSON.parse(await fs.promises.readFile(cachePath, 'utf8'))
        return res.json({ ok: true, source: 'cache', ...cached })
      }
    }catch{}

    const { code, out, err } = await runPythonScript(pythonBin, scriptPath)
    if (code !== 0){
      return res.status(500).json({ ok: false, error: 'python_exit_'+code, detail: err })
    }
    try{
      const parsed = JSON.parse(out)
      // 캐시 저장
      try{ await fs.promises.writeFile(cachePath, JSON.stringify(parsed)) }catch{}
      return res.json(parsed)
    }catch(e){
      return res.status(500).json({ ok: false, error: 'invalid_python_output', detail: out })
    }
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}



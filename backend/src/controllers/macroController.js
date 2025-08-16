const axios = require('axios')

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



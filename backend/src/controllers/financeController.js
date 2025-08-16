const axios = require('axios')

// 스켈레톤: 키만 넣으면 동작하도록 설계. 실제 엔드포인트는 각 기관 가이드를 참고해 조정하세요.

exports.getCompanySummary = async (req, res) => {
  try {
    const { symbol } = req.query // 예: '005930' 또는 'AAPL'
    if (!symbol) return res.status(400).json({ ok: false, error: 'symbol required' })

    // 1) FnGuide (예시용 엔드포인트 placeholder)
    if (process.env.FNGUIDE_API_KEY) {
      const fnUrl = process.env.FNGUIDE_BASE_URL || 'https://api.fnguide.com/v1/finance/summary'
      const { data } = await axios.get(fnUrl, {
        params: { symbol }, headers: { 'x-api-key': process.env.FNGUIDE_API_KEY }
      })
      const norm = normalizeSummary(data)
      return res.json({ ok: true, provider: 'fnguide', data: norm })
    }

    // 2) DART 공시 요약 fallback (예시)
    if (process.env.DART_API_KEY) {
      const dartUrl = process.env.DART_BASE_URL || 'https://opendart.fss.or.kr/api/company.json'
      const { data } = await axios.get(dartUrl, { params: { crtfc_key: process.env.DART_API_KEY, corp_code: symbol } })
      const norm = normalizeSummary(data)
      return res.json({ ok: true, provider: 'dart', data: norm })
    }

    return res.status(400).json({ ok: false, error: 'API key not configured (FnGuide or DART)' })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

exports.getRecentFilings = async (req, res) => {
  try {
    const { symbol, bgn_de, end_de } = req.query
    if (!symbol) return res.status(400).json({ ok: false, error: 'symbol required' })
    if (!process.env.DART_API_KEY) return res.status(400).json({ ok: false, error: 'DART_API_KEY missing' })
    const url = process.env.DART_LIST_URL || 'https://opendart.fss.or.kr/api/list.json'
    const { data } = await axios.get(url, {
      params: { crtfc_key: process.env.DART_API_KEY, corp_code: symbol, bgn_de, end_de }
    })
    res.json({ ok: true, data })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

// 분기 시계열 (매출/영업이익/ROE 등) - FnGuide 우선 스켈레톤
exports.getQuarterly = async (req, res) => {
  try {
    const { symbol } = req.query
    if (!symbol) return res.status(400).json({ ok: false, error: 'symbol required' })

    if (process.env.FNGUIDE_API_KEY) {
      const url = (process.env.FNGUIDE_BASE_URL || 'https://api.fnguide.com/v1/finance') + '/quarterly'
      const { data } = await axios.get(url, {
        params: { symbol }, headers: { 'x-api-key': process.env.FNGUIDE_API_KEY }
      })
      // 기대 포맷: [{ quarter:'2024Q4', revenue:123, opIncome:45, roe:12.3 }, ...]
      const mapped = Array.isArray(data) ? data.map(normalizeQuarterRow) : []
      return res.json({ ok: true, data: mapped })
    }

    return res.status(400).json({ ok: false, error: 'FNGUIDE_API_KEY missing' })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

// ------------------------ helpers ------------------------

function firstDefined(obj, keys) {
  for (const k of keys) {
    if (obj && obj[k] !== undefined) return obj[k]
  }
  return undefined
}

function toNumberOrNull(v) {
  if (v === null || v === undefined) return null
  const n = Number(String(v).replace(/[,\s]/g, ''))
  return Number.isFinite(n) ? n : null
}

function normalizeSummary(raw) {
  const s = Array.isArray(raw) ? raw[0] : raw
  const revenue = toNumberOrNull(firstDefined(s, ['revenue', '매출액', 'sales', '매출']))
  const opIncome = toNumberOrNull(firstDefined(s, ['operatingIncome', '영업이익', 'opIncome']))
  const roe = toNumberOrNull(firstDefined(s, ['roe', 'ROE']))
  return { revenue, operatingIncome: opIncome, roe }
}

function normalizeQuarterRow(row) {
  const quarter = firstDefined(row, ['quarter', 'q', '분기', '연결_분기'])
  const revenue = toNumberOrNull(firstDefined(row, ['revenue', '매출액', 'sales', '매출']))
  const opIncome = toNumberOrNull(firstDefined(row, ['operatingIncome', '영업이익', 'opIncome']))
  const roe = toNumberOrNull(firstDefined(row, ['roe', 'ROE']))
  return { quarter, revenue, opIncome, roe }
}



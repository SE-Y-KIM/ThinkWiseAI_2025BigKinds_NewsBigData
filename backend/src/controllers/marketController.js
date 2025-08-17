const axios = require('axios')

exports.getQuote = async (req, res) => {
  try {
    const { symbol } = req.query
    if (!symbol) return res.status(400).json({ ok: false, error: 'symbol required' })
    if (!process.env.KOSCOM_API_KEY) return res.status(400).json({ ok: false, error: 'KOSCOM_API_KEY missing' })

    const base = process.env.KOSCOM_BASE_URL || 'https://sandbox-apigw.koscom.co.kr/v2/market/stocks'
    const url = `${base}/prices/${encodeURIComponent(symbol)}`
    const { data } = await axios.get(url, { headers: { apikey: process.env.KOSCOM_API_KEY } })
    res.json({ ok: true, data })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}



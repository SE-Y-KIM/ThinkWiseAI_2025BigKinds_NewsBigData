const axios = require('axios')

// 무료로 쓸 수 있는 Yahoo finance community API 프록시들 중 하나를 사용합니다.
// 운영 시에는 자체 프록시 또는 공식 유료 데이터로 교체하세요.
const YF_BASE = process.env.YF_BASE_URL || 'https://query1.finance.yahoo.com/v7/finance/quote'

async function fetchQuotes(symbols) {
  const url = `${YF_BASE}?symbols=${encodeURIComponent(symbols.join(','))}`
  const { data } = await axios.get(url)
  const result = data?.quoteResponse?.result || []
  return result
}

module.exports = { fetchQuotes }



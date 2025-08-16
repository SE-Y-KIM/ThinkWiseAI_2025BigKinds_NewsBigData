const axios = require('axios')

// 빅카인즈 간편 프록시. 실제 키만 넣으면 작동
// https://www.bigkinds.or.kr API 가이드 참고
exports.search = async (req, res) => {
  try {
    const { q = '', size = 10 } = req.query
    const url = process.env.BIGKINDS_BASE_URL || 'https://www.bigkinds.or.kr/api/news/search.do'
    const apiKey = process.env.BIGKINDS_API_KEY
    if (!apiKey) return res.status(400).json({ ok: false, error: 'BIGKINDS_API_KEY is missing' })

    const payload = {
      query: q,
      pageSize: Number(size),
    }

    const { data } = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKey }
    })

    // 통일 포맷으로 정리
    const items = (data?.resultList || []).map((n) => ({
      id: n.newsId || n._id || n.id,
      title: n.title || n.TITLE,
      press: n.provider || n.PROVIDER,
      summary: n.summary || n.SUMMARY,
      publishedAt: n.date || n.PUBLISHED_AT,
      url: n.url || n.URL
    }))

    res.json({ ok: true, items })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}

// 요약 및 키워드 추출 (OpenAI 등 사용 가능). API 키만 넣으면 동작
exports.enrich = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ ok: false, error: 'text required' })

    if (!process.env.OPENAI_API_KEY) return res.status(400).json({ ok: false, error: 'OPENAI_API_KEY missing' })
    const { default: OpenAI } = await import('openai')
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const prompt = `다음 기사 내용을 3문장으로 요약하고, 핵심 키워드 5개를 한국어로 추출해 JSON으로 반환하세요.\n\n기사:\n${text}`
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    })
    const content = completion.choices?.[0]?.message?.content || ''
    res.json({ ok: true, result: content })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}



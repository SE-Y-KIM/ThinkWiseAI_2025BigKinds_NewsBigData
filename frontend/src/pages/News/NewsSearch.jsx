import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { apiGet, API_BASE } from '../../api/client'
import { useLocation } from 'react-router-dom'

const NewsSearchContent = () => {
  const location = useLocation()
  const [q, setQ] = useState('AI 투자')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [enrichResult, setEnrichResult] = useState('')
  const [error, setError] = useState('')

  const search = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`/news/search?q=${encodeURIComponent(q)}&size=10`)
      setItems(res.items || [])
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  const enrich = async (text) => {
    setLoading(true)
    setEnrichResult('')
    try {
      const res = await fetch(`${API_BASE}/news/enrich`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ text }) })
      const data = await res.json()
      setEnrichResult(data.result || '')
    } catch(e){ setEnrichResult(e.message) } finally { setLoading(false) }
  }

  // 쿼리스트링으로부터 q 초기화 및 자동 검색
  useEffect(()=>{
    const sp = new URLSearchParams(location.search)
    const initQ = sp.get('q')
    if (initQ) { setQ(initQ); setTimeout(search, 0) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.search])

  return (
    <div>
      <div style={{ display:'flex', gap:8, maxWidth:640 }}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} style={{ flex:1, padding:12, borderRadius:8, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <button onClick={search} style={{ padding:'12px 16px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#FFD700,#FF8C00)', color:'#1A1A1A', fontWeight:700 }}>검색</button>
      </div>
      {loading && <div style={{ color:'#E0E0E0', marginTop:12 }}>검색 중…</div>}
      {error && <div style={{ color:'#F44336', marginTop:12 }}>{error}</div>}
      <ul style={{ marginTop:16, padding:0, listStyle:'none', display:'grid', gap:12 }}>
        {items.map((n)=> (
          <li key={n.id} style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
            <div style={{ color:'#FFD700', fontWeight:700 }}>{n.press}</div>
            <a href={n.url} target="_blank" rel="noreferrer" style={{ color:'#fff', textDecoration:'none', fontWeight:700, display:'block', marginTop:4 }}>{n.title}</a>
            <div style={{ color:'#E0E0E0', marginTop:6 }}>{n.summary}</div>
            <div style={{ color:'#BDBDBD', marginTop:6, fontSize:12 }}>{n.publishedAt}</div>
            <div style={{ marginTop:8 }}>
              <button onClick={()=>enrich(`${n.title}\n${n.summary || ''}`)} style={{ padding:'8px 12px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#FFD700,#FF8C00)', color:'#1A1A1A', fontWeight:700 }}>요약/키워드</button>
            </div>
          </li>
        ))}
      </ul>
      {enrichResult && (
        <pre style={{ marginTop:16, background:'#1A1A1A', color:'#E0E0E0', padding:12, borderRadius:8, whiteSpace:'pre-wrap' }}>{enrichResult}</pre>
      )}
    </div>
  )
}

const NewsSearch = () => (
  <AppLayout>
    <NewsSearchContent />
  </AppLayout>
)

export default NewsSearch



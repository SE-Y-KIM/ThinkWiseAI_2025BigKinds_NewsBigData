import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { apiGet } from '../../api/client'

const useQuery = () => new URLSearchParams(useLocation().search)

const InsightCard = ({ title, items = [] }) => (
  <div className="tw-card">
    <div style={{ color:'#E0E0E0', marginBottom:8 }}>{title}</div>
    <ul style={{ margin:0, padding:'0 0 0 16px', color:'#E0E0E0' }}>
      {items.map((it, idx)=> <li key={idx} style={{ marginBottom:6 }}>{it}</li>)}
    </ul>
  </div>
)

const MarketCard = ({ market = [] }) => (
  <div className="tw-card">
    <div style={{ color:'#E0E0E0', marginBottom:8 }}>시장 스냅샷</div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
      {market.map(m => (
        <div key={m.symbol} style={{ background:'#1F1F1F', border:'1px solid #3A3A3A', borderRadius:10, padding:12 }}>
          <div style={{ color:'#BDBDBD' }}>{m.symbol}</div>
          <div style={{ color:'#FFFFFF', fontWeight:800, fontSize:20 }}>{m.regularMarketPrice}</div>
          <div style={{ color:(m.regularMarketChangePercent||0)>=0?'#4CAF50':'#F44336' }}>{Number(m.regularMarketChangePercent||0).toFixed(2)}%</div>
        </div>
      ))}
    </div>
  </div>
)

const Highlights = ({ news = [] }) => (
  <div className="tw-card">
    <div style={{ color:'#E0E0E0', marginBottom:8 }}>뉴스 하이라이트</div>
    <ul style={{ margin:0, padding:0, listStyle:'none', display:'grid', gap:12 }}>
      {news.map((n, idx)=> (
        <li key={idx} style={{ background:'#1A1A1A', border:'1px solid #333', borderRadius:10, padding:12 }}>
          <div style={{ color:'#FFD700', fontWeight:700 }}>{n.press}</div>
          <a href={n.url} target="_blank" rel="noreferrer" style={{ color:'#fff', textDecoration:'none', fontWeight:700, display:'block', marginTop:4 }}>{n.title}</a>
          <div style={{ color:'#BDBDBD', fontSize:12, marginTop:6 }}>{n.date}</div>
        </li>
      ))}
    </ul>
  </div>
)

const AnalysisContent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const qs = useQuery()
  const [q, setQ] = useState(qs.get('q') || '')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (query) => {
    if (!query) return
    try {
      setLoading(true)
      const res = await apiGet(`/analysis/stock?q=${encodeURIComponent(query)}`)
      setData(res)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  useEffect(()=>{ const init = qs.get('q'); if (init) { setQ(init); load(init) } },[location.search])

  const onSubmit = (e) => {
    e?.preventDefault()
    navigate(`/analysis?q=${encodeURIComponent(q)}`)
  }

  const insights = useMemo(()=>{
    const arr = []
    if (!data) return arr
    const cnt = data.news?.length || 0
    if (cnt) arr.push(`최근 관련 뉴스 ${cnt}건 수집됨`)
    const presses = (data.news||[]).reduce((m,n)=>{ const p=n.press||'기타'; m[p]=(m[p]||0)+1; return m },{})
    const topPress = Object.entries(presses).sort((a,b)=>b[1]-a[1])[0]
    if (topPress) arr.push(`주요 언론사: ${topPress[0]} (${topPress[1]}건)`) 
    const change = (data.market||[])[0]?.regularMarketChangePercent
    if (change!==undefined) arr.push(`시장 변화율: ${Number(change).toFixed(2)}%`)
    return arr
  },[data])

  return (
    <div style={{ display:'grid', gap:16 }}>
      <form onSubmit={onSubmit} style={{ display:'flex', gap:8 }}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="기업/키워드를 입력하세요" style={{ flex:1, padding:12, borderRadius:8, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <button type="submit" className="tw-btn tw-btn--primary">분석</button>
      </form>
      {loading && <div style={{ color:'#E0E0E0' }}>분석 중…</div>}
      {error && <div style={{ color:'#F44336' }}>{error}</div>}
      {data && (
        <>
          <InsightCard title="간단 인사이트" items={insights} />
          <MarketCard market={data.market || []} />
          <Highlights news={data.news || []} />
          {data.ai && (
            <div className="tw-card">
              <div className="tw-gradient-text" style={{ fontWeight:800, marginBottom:8 }}>AI 요약</div>
              <div style={{ color:'#E0E0E0', marginBottom:8 }}>{data.ai.summary || ''}</div>
              {Array.isArray(data.ai.reasons) && data.ai.reasons.length>0 && (
                <ul style={{ color:'#E0E0E0', margin:0, padding:'0 0 0 16px' }}>
                  {data.ai.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
                </ul>
              )}
              {Array.isArray(data.ai.keywords) && (
                <div style={{ marginTop:8 }}>
                  {data.ai.keywords.map((k,i)=>(<span key={i} className="tw-chip" style={{ marginRight:6 }}>{k}</span>))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const AnalysisPage = () => (
  <AppLayout>
    <AnalysisContent />
  </AppLayout>
)

export default AnalysisPage



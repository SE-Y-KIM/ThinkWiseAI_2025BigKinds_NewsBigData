import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
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

// 차트 패널 - Chart.js 렌더링
const ChartPanel = ({ chart }) => {
  if (!chart || !Array.isArray(chart.labels)) return null
  const data = {
    labels: chart.labels,
    datasets: (chart.series || []).map((s, idx) => ({
      label: s.label || `Series ${idx+1}`,
      data: s.data || [],
      borderColor: ['#f59e0b', '#22c55e', '#3b82f6', '#ef4444'][idx % 4],
      backgroundColor: 'transparent',
      tension: 0.25,
      borderWidth: 2
    }))
  }
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#e5e7eb' } },
      tooltip: { intersect:false, mode:'index' }
    },
    scales: {
      x: { ticks: { color:'#9ca3af' }, grid: { color:'#27272a' } },
      y: { ticks: { color:'#9ca3af' }, grid: { color:'#27272a' } }
    }
  }
  return (
    <div className="tw-card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <div>
          <div style={{ color:'#E0E0E0', fontWeight:800 }}>{chart.title || '데이터 시각화'}</div>
          {chart.subtitle && <div style={{ color:'#9ca3af', fontSize:12 }}>{chart.subtitle}</div>}
        </div>
        <div style={{ color:'#9ca3af', fontSize:12 }}>업데이트: {chart.updatedAt || '-'}</div>
      </div>
      <Line data={data} options={options} height={80} />
    </div>
  )
}

// 하단 꼬리질문 바
const FollowUpBar = ({ items = [], onPick }) => {
  if (!items.length) return null
  return (
    <div style={{ position:'sticky', bottom:16, zIndex:1 }}>
      <div style={{
        background:'#1a1a1a',
        border:'1px solid #3a3a3a',
        borderRadius:12,
        padding:'10px 12px',
        boxShadow:'0 6px 18px rgba(0,0,0,.45)',
        display:'flex',
        flexWrap:'wrap',
        gap:8,
        alignItems:'center'
      }}>
        <span style={{ color:'#f59e0b', fontWeight:700, marginRight:6 }}>더 깊게 분석해볼까요?</span>
        {items.slice(0,5).map((txt, i)=> (
          <button key={i} className="tw-btn" style={{ background:'#27272a', border:'1px solid #3a3a3a', color:'#e5e7eb' }} onClick={()=> onPick && onPick(txt)}>
            {txt}
          </button>
        ))}
      </div>
    </div>
  )
}

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

  const followUps = useMemo(()=>{
    if (data?.ai?.followUps && data.ai.followUps.length) return data.ai.followUps
    // 백엔드 미구현 시 키워드로 꼬리질문 생성
    const kws = (data?.ai?.keywords || []).slice(0,3)
    return kws.map(k=> `${k}의 향후 전망은?`)
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
        <div className="tw-card" style={{ padding:0, border:'none', background:'transparent' }}>
          {/* 상단: 리포트 생성 버튼 */}
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:8 }}>
            <button className="tw-btn" style={{ border:'1px solid #f59e0b', color:'#f59e0b', background:'transparent' }}>리포트 생성</button>
          </div>
          {/* 3분할 레이아웃 */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1.5fr', gap:16 }}>
            <div style={{ display:'grid', gap:16 }}>
              <ChartPanel chart={data.chart} />
              <Highlights news={data.news || []} />
            </div>
            <div style={{ display:'grid', gap:16 }}>
              <InsightCard title="간단 인사이트" items={insights} />
              {data.ai && (
                <div className="tw-card">
                  <div className="tw-gradient-text" style={{ fontWeight:800, marginBottom:8 }}>AI 요약</div>
                  <div style={{ color:'#E0E0E0', marginBottom:8 }}>{data.ai.summary || ''}</div>
                  {Array.isArray(data.ai.reasons) && data.ai.reasons.length>0 && (
                    <ul style={{ color:'#E0E0E0', margin:0, padding:'0 0 0 16px' }}>
                      {data.ai.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
                    </ul>
                  )}
                  {/* AI 카드 내부 꼬리질문은 최소화하고 하단 바에서 강조 */}
                </div>
              )}
            </div>
          </div>
          {/* 하단 고정 꼬리질문 바 */}
          <FollowUpBar items={followUps} onPick={(fu)=>{ setQ(fu); navigate(`/analysis?q=${encodeURIComponent(fu)}`) }} />
        </div>
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



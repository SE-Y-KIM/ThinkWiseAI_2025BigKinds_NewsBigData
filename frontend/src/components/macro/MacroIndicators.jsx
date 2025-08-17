import React, { useEffect, useMemo, useState } from 'react'
import { API_BASE } from '../../api/client'

const Sparkline = ({ points = [], stroke = '#22c55e', width = 180, height = 56 }) => {
  if (!points.length) return <div style={{ color:'#999', fontSize:12 }}>데이터 없음</div>
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)
  const d = points.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * height
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display:'block' }}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

const cardStyle = { background:'#232323', border:'1px solid #3A3A3A', borderRadius:16, padding:20, boxShadow:'0 8px 20px rgba(0,0,0,.35)' }

const SAMPLE_POINTS = 12
const CHANGE_DECIMALS = 2

function samplePoints(arr = [], n = SAMPLE_POINTS){
  if (!arr?.length) return []
  if (arr.length <= n) return arr
  const step = arr.length / n
  const out = []
  let i = 0
  while (out.length < n){ out.push(arr[Math.floor(i)]); i += step }
  return out
}

export default function MacroIndicators(){
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  useEffect(()=>{
    const url = `${API_BASE}/macro/kpi`
    fetch(url, { method:'GET' })
      .then(async r=>{
        if(!r.ok) throw new Error(`${r.status}`)
        return r.json()
      })
      .then(j=>{
        if(j && j.ok){ setItems(j.items); setUpdatedAt(new Date().toLocaleTimeString()) }
        else { setError(j?.error||'로드 실패'); setItems([]) }
      })
      .catch(e=>{ setError(`Failed to fetch: ${e.message}`); setItems([]) })
  },[])

  const data = useMemo(()=> (items||[]).map(it=> ({
    ...it,
    series: samplePoints(it.series || [], SAMPLE_POINTS)
  })), [items])

  return (
    <section style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', color:'#E0E0E0', fontSize:14, marginBottom:12, padding:'0 16px' }}>
        <div>주요 거시경제 지표</div>
        <div>마지막 업데이트: {updatedAt || '연결 중...'}</div>
      </div>
      {error && <div style={{ color:'#f87171', fontSize:12, padding:'0 16px 8px' }}>{error}</div>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24 }}>
        {data.map((it)=>{
          const negative = (it.changePct??it.changePercent) < 0
          const pct = Number(Math.abs(it.changePct??it.changePercent)).toFixed(CHANGE_DECIMALS)
          return (
            <div key={it.code} style={cardStyle}>
              <div style={{ display:'flex', justifyContent:'space-between', color:'#9ca3af', fontSize:13, marginBottom:8 }}>
                <span>{it.label || it.name}</span>
                <span style={{ textTransform:'uppercase' }}>{it.code}</span>
              </div>
              <div style={{ fontSize:30, fontWeight:800, color:'#fff' }}>{it.value}</div>
              <div style={{ marginTop:4, color: negative ? '#ef4444' : '#22c55e' }}>{negative? '▼':'▲'} {pct}%</div>
              <div style={{ marginTop:8 }}>
                <Sparkline points={it.series || []} stroke={negative? '#ef4444' : '#22c55e'} />
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ textAlign:'center', color:'#9ca3af', fontSize:12, marginTop:8 }}>yfinance 기반 데이터 · 60초 캐시 · 스파크라인 {SAMPLE_POINTS}포인트</div>
    </section>
  )
}



import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { apiGet } from '../../../api/client'

const FinanceCards = ({ symbol='005930' }) => {
  const [summary, setSummary] = useState(null)
  const [filings, setFilings] = useState([])
  const [quarterly, setQuarterly] = useState([])

  useEffect(()=>{
    apiGet(`/finance/summary?symbol=${symbol}`).then((r)=> setSummary(r))
    const now = new Date()
    const end = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`
    const start = `${now.getFullYear()-1}0101`
    apiGet(`/finance/filings?symbol=${symbol}&bgn_de=${start}&end_de=${end}`).then((r)=> setFilings((r.data?.list || r.data?.items || []).slice(0,5)))
    apiGet(`/finance/quarterly?symbol=${symbol}`).then((r)=> setQuarterly(r.data || r))
  },[symbol])

  // 핵심 지표 추출 유틸 (데이터 포맷 다양성을 고려해 best-effort로 꺼냄)
  const metrics = (() => {
    const s = summary?.data || summary || {}
    const find = (...keys) => {
      for (const k of keys) {
        const v = s[k]
        if (v !== undefined) return v
      }
      return undefined
    }
    const revenue = toNum(find('revenue','매출액','sales','매출'))
    const opIncome = toNum(find('operatingIncome','영업이익','opIncome'))
    const roe = toNum(find('roe','ROE'))
    return { revenue, opIncome, roe }
  })()

  const fmtWon = (v)=> v==null?'-':`${(v/100000000).toFixed(1)}억`
  const fmtPct = (v)=> v==null?'-':`${Number(v).toFixed(1)}%`
  const toNum = (v)=>{
    if (v==null) return null
    const n = Number(String(v).replace(/[,\s]/g,''))
    return Number.isFinite(n)?n:null
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
        <div style={{ color:'#E0E0E0', marginBottom:8 }}>핵심 지표</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
          <div style={{ background:'#1F1F1F', border:'1px solid #3A3A3A', borderRadius:10, padding:12 }}>
            <div style={{ color:'#BDBDBD' }}>매출</div>
            <div style={{ color:'#FFFFFF', fontWeight:800, fontSize:20 }}>{fmtWon(metrics.revenue)}</div>
          </div>
          <div style={{ background:'#1F1F1F', border:'1px solid #3A3A3A', borderRadius:10, padding:12 }}>
            <div style={{ color:'#BDBDBD' }}>영업이익</div>
            <div style={{ color:'#FFFFFF', fontWeight:800, fontSize:20 }}>{fmtWon(metrics.opIncome)}</div>
          </div>
          <div style={{ background:'#1F1F1F', border:'1px solid #3A3A3A', borderRadius:10, padding:12 }}>
            <div style={{ color:'#BDBDBD' }}>ROE</div>
            <div style={{ color:'#FFFFFF', fontWeight:800, fontSize:20 }}>{fmtPct(metrics.roe)}</div>
          </div>
        </div>
      </div>
      <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
        <div style={{ color:'#E0E0E0', marginBottom:8 }}>최근 공시</div>
        <ul style={{ margin:0, padding:0, listStyle:'none', display:'grid', gap:8 }}>
          {filings.map((f,idx)=> (
            <li key={idx} style={{ color:'#E0E0E0' }}>{f.report_nm || f.reportName || f.title} ({f.rcept_dt || f.date})</li>
          ))}
        </ul>
      </div>
      <div style={{ gridColumn:'1 / span 2', background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
        <div style={{ color:'#E0E0E0', marginBottom:8 }}>분기 시계열 (매출/영업이익/ROE)</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={quarterly}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="quarter" stroke="#BDBDBD"/>
            <YAxis yAxisId="left" stroke="#BDBDBD"/>
            <YAxis yAxisId="right" orientation="right" stroke="#BDBDBD"/>
            <Tooltip formatter={(value, name)=>{
              if(name==='ROE') return [fmtPct(value), name]
              return [fmtWon(value), name]
            }} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" name="매출" stroke="#FFD700" strokeWidth={2} />
            <Line yAxisId="left" type="monotone" dataKey="opIncome" name="영업이익" stroke="#4CAF50" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="roe" name="ROE" stroke="#FF7043" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceCards



import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { apiGet } from '../../api/client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import FinanceCards from './components/FinanceCards'
const fmt = (d)=> `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`

const useKpi = () => {
  const [data, setData] = useState([])
  useEffect(()=>{ apiGet('/dashboard/kpi').then(r=>setData(r.data||[])) },[])
  return data
}

const KpiCards = () => {
  const data = useKpi()
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
      {data.map((d)=> (
        <div key={d.key} style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
          <div style={{ color:'#E0E0E0' }}>{d.name}</div>
          <div style={{ color:'#fff', fontWeight:800, fontSize:24, marginTop:8 }}>{d.value}</div>
          <div style={{ color:(d.changePercent||0)>=0?'#4CAF50':'#F44336' }}>{Number(d.changePercent||0).toFixed(2)}%</div>
        </div>
      ))}
    </div>
  )
}

const TrendChart = () => {
  const [data, setData] = useState([])
  const [q, setQ] = useState('AI')
  const [press, setPress] = useState('')
  const [start, setStart] = useState('20250101')
  const [end, setEnd] = useState('20251231')

  const load = () => {
    const params = new URLSearchParams({ q, size: '200', start, end, press }).toString()
    apiGet(`/dashboard/trending?${params}`).then((r)=>{
      const items = r.data || []
      setData(items.map((x,idx)=>({ idx: idx+1, keyword: x.keyword, count: x.count })))
    })
  }

  useEffect(load,[])
  return (
    <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
      <div style={{ color:'#E0E0E0', marginBottom:8, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        <span>뉴스 트렌드</span>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="키워드" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <input value={press} onChange={(e)=>setPress(e.target.value)} placeholder="언론사" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <input value={start} onChange={(e)=>setStart(e.target.value)} placeholder="시작(YYYYMMDD)" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <input value={end} onChange={(e)=>setEnd(e.target.value)} placeholder="종료(YYYYMMDD)" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <button onClick={load} style={{ padding:'6px 10px', borderRadius:6, border:'none', background:'linear-gradient(135deg,#FFD700,#FF8C00)', color:'#1A1A1A', fontWeight:700 }}>적용</button>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={()=>{ const d=new Date(); const end=fmt(d); d.setDate(d.getDate()-7); setStart(fmt(d)); setEnd(fmt(new Date())); }} style={{ padding:'6px 8px', border:'1px solid #4A4A4A', borderRadius:6, background:'transparent', color:'#E0E0E0' }}>7D</button>
          <button onClick={()=>{ const d=new Date(); const end=fmt(d); d.setDate(d.getDate()-30); setStart(fmt(d)); setEnd(fmt(new Date())); }} style={{ padding:'6px 8px', border:'1px solid #4A4A4A', borderRadius:6, background:'transparent', color:'#E0E0E0' }}>30D</button>
          <button onClick={()=>{ const y=new Date().getFullYear(); setStart(`${y}0101`); setEnd(fmt(new Date())); }} style={{ padding:'6px 8px', border:'1px solid #4A4A4A', borderRadius:6, background:'transparent', color:'#E0E0E0' }}>YTD</button>
          <button onClick={load} style={{ padding:'6px 10px', border:'none', borderRadius:6, background:'linear-gradient(135deg,#FFD700,#FF8C00)', color:'#1A1A1A', fontWeight:700 }}>재조회</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="keyword" stroke="#BDBDBD"/>
          <YAxis stroke="#BDBDBD"/>
          <Tooltip />
          <Bar dataKey="count" fill="#FFD700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const SectorBar = () => {
  const [data, setData] = useState([])
  const [codes, setCodes] = useState('KS11IT,KS11HC,KS11FN')
  const [names, setNames] = useState('IT,헬스케어,금융')

  const load = () => {
    const qs = new URLSearchParams({ codes, names }).toString()
    apiGet(`/dashboard/sectors?${qs}`).then((r)=> setData(r.data||[]))
  }

  useEffect(load,[])
  return (
    <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:16 }}>
      <div style={{ color:'#E0E0E0', marginBottom:8, display:'flex', gap:8, alignItems:'center' }}>
        <span>섹터 지표 (KRX 업종지수)</span>
        <input value={codes} onChange={(e)=>setCodes(e.target.value)} placeholder="지수코드 CSV" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <input value={names} onChange={(e)=>setNames(e.target.value)} placeholder="라벨 CSV" style={{ padding:6, borderRadius:6, border:'1px solid #4A4A4A', background:'transparent', color:'#fff' }} />
        <button onClick={load} style={{ padding:'6px 10px', border:'none', borderRadius:6, background:'linear-gradient(135deg,#FFD700,#FF8C00)', color:'#1A1A1A', fontWeight:700 }}>적용</button>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="sector" stroke="#BDBDBD"/>
          <YAxis stroke="#BDBDBD"/>
          <Tooltip />
          <Bar dataKey="perf" fill="#FFD700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const DashboardContent = () => (
  <div style={{ display:'grid', gap:16 }}>
    <KpiCards />
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <TrendChart />
      <SectorBar />
    </div>
    <FinanceCards symbol="005930" />
  </div>
)

const DashboardPage = () => (
  <AppLayout>
    <DashboardContent />
  </AppLayout>
)

export default DashboardPage



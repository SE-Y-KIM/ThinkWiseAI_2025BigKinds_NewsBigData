import React, { useEffect, useState } from 'react'
import { apiGet } from '../../api/client'
import MacroIndicators from '../../components/macro/MacroIndicators'
import { useNavigate } from 'react-router-dom'

const useKpi = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    apiGet('/dashboard/kpi')
      .then((res) => {
        if (!mounted) return
        setData(res.data || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  return { data, loading, error }
}

const IndicatorCard = ({ name, value, change, up }) => (
  <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:16, padding:24 }}>
    <div style={{ color:'#FFFFFF', fontWeight:600 }}>{name}</div>
    <div style={{ color:'#FFFFFF', fontWeight:700, fontSize:28, marginTop:8 }}>{value}</div>
    <div style={{ color: up ? '#4CAF50' : '#F44336', marginTop:6 }}>{change}</div>
  </div>
)

const WelcomePage = () => {
  const { data: widgets, loading } = useKpi()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const goSearch = () => {
    const q = (query || '').trim()
    if (!q) return
    navigate(`/analysis?q=${encodeURIComponent(q)}`)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      goSearch()
    }
  }
  return (
    <div>
      <section style={{ textAlign:'center', padding:'48px 0 24px 0' }}>
        <h1 style={{ fontSize:48, fontWeight:800, background:'linear-gradient(135deg,#FFD700,#FFA500,#FF8C00,#FFD700)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:0 }}>ThinkWise</h1>
        <p style={{ color:'#E0E0E0', margin:'12px 0 24px' }}>뉴스 빅데이터를 AI로 분석하고 인사이트를 발견하세요</p>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:16, background:'#2C2C2C', border:'2px solid #4A4A4A', borderRadius:16, padding:12, boxShadow:'0 10px 15px -3px rgba(0,0,0,.1)' }}>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={onKeyDown} placeholder="뉴스 검색 또는 AI에게 질문하기..." style={{ flex:1, background:'none', border:'none', color:'#fff', fontSize:18, outline:'none' }} />
            <button onClick={goSearch} style={{ background:'linear-gradient(135deg,#FFD700,#FFA500,#FF8C00)', color:'#1A1A1A', border:'none', borderRadius:12, padding:'10px 16px', fontWeight:700 }}>전송</button>
          </div>
        </div>
      </section>

      <MacroIndicators />
    </div>
  )
}

export default WelcomePage



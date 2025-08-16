import React, { useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { apiGet } from '../../api/client'
import { useNavigate } from 'react-router-dom'

const TabButton = ({ active, children, onClick }) => (
  <button onClick={onClick} style={{ flex:1, padding:12, background: active? 'linear-gradient(135deg,#FFD700,#FF8C00)' : 'transparent', color: active? '#1A1A1A':'#E0E0E0', border:'none', borderRadius:10, cursor:'pointer' }}> {children} </button>
)

const Card = ({ title, preview, participants, primary, onClick, tags = [], votes = 0 }) => (
  <div onClick={onClick} style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:16, padding:16, marginBottom:12, transition:'transform .2s ease', cursor:'pointer' }}>
    <div style={{ fontWeight:700, color:'#FFFFFF', marginBottom:8 }}>{title}</div>
    <div style={{ color:'#BDBDBD', marginBottom:12 }}>{preview}</div>
    <div style={{ marginBottom:8 }}>
      {tags.map(t => <span key={t} className="tw-chip" style={{ marginRight:6 }}>{t}</span>)}
    </div>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ color:'#9E9E9E' }}>추천 {votes} · 참여자 {participants}명</span>
      <button style={{ padding:'8px 12px', borderRadius:10, border: primary? 'none':'1px solid #FFD700', background: primary? 'linear-gradient(135deg,#FFD700,#FF8C00)':'transparent', color: primary? '#1A1A1A':'#FFD700', cursor:'pointer' }}>{primary? '토론 참여하기':'의견 남기기'}</button>
    </div>
  </div>
)

const Feature = ({ icon, title, desc }) => (
  <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:16, padding:16, textAlign:'center' }}>
    <div style={{ width:48, height:48, borderRadius:999, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#FFD700,#FF8C00)' }}>{icon}</div>
    <div style={{ fontWeight:700, color:'#FFFFFF', marginBottom:6 }}>{title}</div>
    <div style={{ color:'#BDBDBD' }}>{desc}</div>
  </div>
)

const CommunityPage = () => {
  const [tab, setTab] = useState('latest')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)
  const loaderRef = useRef(null)
  const navigate = useNavigate()
  const [tagQuery, setTagQuery] = useState('')

  useEffect(() => {
    setPosts([])
    setPage(1)
    setHasNext(true)
  }, [tab, tagQuery])

  useEffect(() => {
    let ignore = false
    const fetchPage = async () => {
      if (!hasNext) return
      const qs = new URLSearchParams()
      qs.set('sort', tab==='popular' ? 'popular' : 'latest')
      qs.set('page', String(page))
      qs.set('limit', '10')
      if (tagQuery.trim()) qs.set('tags', tagQuery.trim())
      const r = await apiGet(`/community?${qs.toString()}`)
      if (ignore) return
      setPosts(prev => [...prev, ...(r.data.posts || [])])
      setHasNext(r.data.hasNext)
    }
    fetchPage()
    return () => { ignore = true }
  }, [tab, page, hasNext, tagQuery])

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && hasNext) setPage(p => p + 1)
      })
    })
    if (loaderRef.current) io.observe(loaderRef.current)
    return () => io.disconnect()
  }, [hasNext])
  return (
    <AppLayout>
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ display:'flex', gap:8 }}>
            <TabButton active={tab==='latest'} onClick={()=>setTab('latest')}>최신</TabButton>
            <TabButton active={tab==='popular'} onClick={()=>setTab('popular')}>추천순</TabButton>
          </div>
          <button className="tw-btn tw-btn--primary" onClick={()=>navigate('/community/new')}>글 작성</button>
        </div>
        <div style={{ textAlign:'center', marginBottom:12 }}>
          <h1 style={{ margin:0, background:'linear-gradient(135deg,#FFD700,#FF8C00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>투자 관점을 나누고, 함께 성장하세요</h1>
          <div style={{ color:'#E0E0E0' }}>ThinkWise AI 커뮤니티에서 분석 리포트를 공유하고, 다양한 시각을 만나보세요.</div>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:16, alignItems:'center' }}>
          <input value={tagQuery} onChange={(e)=>setTagQuery(e.target.value)} placeholder="태그 필터 (쉼표 구분: AI,금리)" style={{ flex:1, padding:10, borderRadius:10, border:'1px solid #4A4A4A', background:'#3A3A3A', color:'#FFFFFF' }} />
          <button className="tw-btn tw-btn--ghost" onClick={()=>setTagQuery('')}>초기화</button>
        </div>
        <div style={{ display:'flex', gap:8, background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:4, maxWidth:600, margin:'0 auto 16px' }}>
          <TabButton active={tab==='latest'} onClick={()=>setTab('latest')}>최신 토론</TabButton>
          <TabButton active={tab==='popular'} onClick={()=>setTab('popular')}>인기 리포트</TabButton>
        </div>
        <div style={{ marginBottom:24 }}>
          {posts.map((p)=> (
            <Card key={p._id} title={p.title} preview={p.content?.slice(0,120)} participants={p.participants || (p.comments?.length || 0)} votes={p.votes||0} tags={p.tags||[]} primary onClick={()=>navigate(`/community/${p._id}`)} />
          ))}
          {posts.length === 0 && <div style={{ color:'#9E9E9E' }}>표시할 게시글이 없습니다.</div>}
          <div ref={loaderRef} style={{ height: 1 }} />
        </div>
        <div style={{ background:'linear-gradient(135deg,#FFD700,#FF8C00)', borderRadius:16, padding:24, textAlign:'center', marginBottom:24 }}>
          <div style={{ fontWeight:800, fontSize:18, color:'#1A1A1A', marginBottom:8 }}>당신의 분석이 누군가의 인사이트가 됩니다</div>
          <div style={{ color:'#1A1A1A', marginBottom:12 }}>ThinkWise AI 커뮤니티에서 지식을 나누고 함께 성장해보세요</div>
          <button style={{ background:'#1A1A1A', color:'#FFD700', border:'none', padding:'10px 16px', borderRadius:10, fontWeight:700, cursor:'pointer' }}>내 리포트 공유하기</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:12 }}>
          <Feature icon="📊" title="리포트 찬반 투표" desc="다양한 관점의 분석에 투표하고 인기 리포트를 확인하세요" />
          <Feature icon="🏷️" title="분석 관점 태그" desc="기술주, 거시경제, 원자재 등 관심 분야별 토론" />
          <Feature icon="🔖" title="북마크 및 알림" desc="관심 토론 저장 및 새 댓글 알림" />
        </div>
      </div>
    </AppLayout>
  )
}

export default CommunityPage



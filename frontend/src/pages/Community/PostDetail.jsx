import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { apiGet, apiPost } from '../../api/client'

const Chip = ({ children }) => (
  <span className="tw-chip" style={{ display:'inline-block', padding:'4px 8px', borderRadius:999, border:'1px solid #3A3A3A', color:'#E0E0E0', marginRight:8 }}>{children}</span>
)

const Comment = ({ c }) => (
  <div style={{ borderTop:'1px solid #3A3A3A', padding:'12px 0', color:'#E0E0E0' }}>{c.content}</div>
)

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [voting, setVoting] = useState(false)
  const [comments, setComments] = useState([])
  const [cPage, setCPage] = useState(1)
  const [cHasNext, setCHasNext] = useState(true)
  const loaderRef = useRef(null)

  const load = async () => {
    setLoading(true)
    try {
      const r = await apiGet(`/community/${id}`)
      setPost(r.data.post)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [id])

  const loadComments = async (page = 1) => {
    const r = await apiGet(`/community/${id}/comments?page=${page}&limit=20`)
    if (page === 1) setComments(r.data.comments || [])
    else setComments(prev => [...prev, ...(r.data.comments || [])])
    setCHasNext(r.data.hasNext)
  }

  const submitComment = async () => {
    if (!comment.trim()) return
    await apiPost(`/community/${id}/comments`, { content: comment.trim() })
    setComment('')
    await loadComments(1)
  }

  const vote = async (delta) => {
    setVoting(true)
    await apiPost(`/community/${id}/vote`, { delta })
    await load()
    setVoting(false)
  }

  useEffect(() => { setComments([]); setCPage(1); setCHasNext(true); loadComments(1) }, [id])
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && cHasNext) setCPage(p => p + 1) })
    })
    if (loaderRef.current) io.observe(loaderRef.current)
    return () => io.disconnect()
  }, [cHasNext])
  useEffect(() => { if (cPage > 1) loadComments(cPage) }, [cPage])

  if (loading) return <AppLayout><div style={{ color:'#E0E0E0' }}>불러오는 중...</div></AppLayout>
  if (!post) return <AppLayout><div style={{ color:'#E0E0E0' }}>게시글을 찾을 수 없습니다.</div></AppLayout>

  return (
    <AppLayout>
      <div>
        <div style={{ marginBottom:12 }}>
          {(post.tags || []).map(t => <Chip key={t}>{t}</Chip>)}
        </div>
        <h2 style={{ marginTop:0, background:'linear-gradient(135deg,#FFD700,#FF8C00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{post.title}</h2>
        <div style={{ color:'#E0E0E0', whiteSpace:'pre-wrap', marginBottom:16 }}>{post.content}</div>
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          <button disabled={voting} onClick={()=>vote(1)} className="tw-btn tw-btn--primary">추천 {post.votes || 0}</button>
          <button disabled={voting} onClick={()=>vote(-1)} className="tw-btn tw-btn--ghost">비추천</button>
        </div>

        <div style={{ background:'#2C2C2C', border:'1px solid #3A3A3A', borderRadius:12, padding:12 }}>
          <div style={{ color:'#FFFFFF', fontWeight:700, marginBottom:8 }}>댓글 {post.comments?.length || 0}</div>
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="댓글을 입력하세요" style={{ flex:1, padding:10, borderRadius:10, border:'1px solid #4A4A4A', background:'#3A3A3A', color:'#FFFFFF' }} />
            <button onClick={submitComment} className="tw-btn tw-btn--primary">등록</button>
          </div>
          <div>
            {comments.map(c => (<Comment key={c._id} c={c} />))}
            <div ref={loaderRef} style={{ height: 1 }} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default PostDetail



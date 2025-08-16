import React, { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { apiPost } from '../../api/client'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    if (t.length > 20) return alert('태그는 20자 이내여야 합니다.')
    if (tags.length >= 5) return alert('태그는 최대 5개까지 가능합니다.')
    if (tags.includes(t)) return alert('중복 태그입니다.')
    setTags([...tags, t])
    setTagInput('')
  }

  const removeTag = (t) => setTags(tags.filter(x => x !== t))

  const submit = async () => {
    if (title.trim().length < 5) return alert('제목은 최소 5자 이상 입력해주세요.')
    if (content.trim().length < 20) return alert('내용은 최소 20자 이상 입력해주세요.')
    setLoading(true)
    try {
      const r = await apiPost('/community', { title: title.trim(), content: content.trim(), tags })
      navigate(`/community/${r.data.post._id}`)
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  return (
    <AppLayout>
      <div className="tw-card">
        <h2 className="tw-gradient-text" style={{ marginTop:0 }}>새 글 작성</h2>
        <div style={{ display:'grid', gap:12 }}>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="제목" style={{ padding:12, borderRadius:10, border:'1px solid #4A4A4A', background:'#3A3A3A', color:'#FFFFFF' }} />
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용" rows={10} style={{ padding:12, borderRadius:10, border:'1px solid #4A4A4A', background:'#3A3A3A', color:'#FFFFFF' }} />
          <div>
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} placeholder="태그 입력 후 추가" style={{ flex:1, padding:10, borderRadius:10, border:'1px solid #4A4A4A', background:'#3A3A3A', color:'#FFFFFF' }} />
              <button onClick={addTag} className="tw-btn tw-btn--ghost">추가</button>
            </div>
            <div>
              {tags.map(t => (
                <span key={t} className="tw-chip" style={{ marginRight:8 }}>
                  {t} <button onClick={()=>removeTag(t)} style={{ marginLeft:6, background:'none', border:'none', color:'#FFD700' }}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <button onClick={()=>navigate(-1)} className="tw-btn tw-btn--ghost">취소</button>
            <button disabled={loading} onClick={submit} className="tw-btn tw-btn--primary">{loading? '작성 중...' : '작성'}</button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default NewPost



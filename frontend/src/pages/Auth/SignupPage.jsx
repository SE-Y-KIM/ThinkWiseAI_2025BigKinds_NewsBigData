import React, { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../contexts/AuthContext'

const styles = {
  card: { maxWidth: 480, margin: '48px auto', background: '#2C2C2C', border: '1px solid #3A3A3A', borderRadius: 16, padding: 24, boxShadow: '0 10px 20px rgba(0,0,0,0.25)' },
  title: { fontSize: 24, fontWeight: 800, background: 'linear-gradient(135deg,#FFD700,#FF8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, textAlign: 'center' },
  subtitle: { color: '#E0E0E0', textAlign: 'center', marginTop: 8, marginBottom: 16 },
  label: { display: 'block', marginBottom: 8, color: '#FFFFFF', fontSize: 14 },
  input: { width: '100%', padding: 12, borderRadius: 10, border: '1px solid #4A4A4A', background: '#3A3A3A', color: '#FFFFFF' },
  button: { width: '100%', padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#FFD700,#FF8C00)', color: '#1A1A1A', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px rgba(255,215,0,0.25)' },
}

const SignupForm = () => {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) return alert('비밀번호가 일치하지 않습니다.')
    setLoading(true)
    const res = await register({ name, email, password })
    setLoading(false)
    if (!res.ok) alert(res.error)
  }
  return (
    <div className="tw-card" style={{ ...styles.card, boxShadow:'none' }}>
      <h1 style={styles.title}>ThinkWise AI 무료 가입</h1>
      <div style={styles.subtitle}>데이터 기반 AI 분석, 지금 시작하세요.</div>
      <form onSubmit={onSubmit}>
        <label style={styles.label}>이름</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} style={styles.input} placeholder="이름을 입력하세요" />
        <label style={{ ...styles.label, marginTop: 12 }}>이메일 주소</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} style={styles.input} placeholder="이메일을 입력하세요" />
        <label style={{ ...styles.label, marginTop: 12 }}>비밀번호</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={styles.input} placeholder="비밀번호를 설정하세요" />
        <label style={{ ...styles.label, marginTop: 12 }}>비밀번호 확인</label>
        <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} style={styles.input} placeholder="비밀번호를 다시 입력하세요" />
        <button type="submit" disabled={loading} className="tw-btn tw-btn--primary" style={{ width:'100%', marginTop:16 }}>{loading ? '가입 중...' : '회원가입'}</button>
      </form>
      <div style={{ marginTop: 16, color: '#BDBDBD', textAlign: 'center' }}>카드 등록 없이, 지금 바로 AI 분석을 체험해보세요.</div>
    </div>
  )
}

const SignupPage = () => (
  <AppLayout>
    <SignupForm />
  </AppLayout>
)

export default SignupPage



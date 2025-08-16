import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'

const styles = {
  card: {
    maxWidth: 420,
    margin: '48px auto',
    background: '#2C2C2C',
    border: '1px solid #3A3A3A',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
    position: 'relative',
  },
  logo: {
    fontWeight: 800,
    fontSize: 24,
    background: 'linear-gradient(135deg,#FFD700,#FF8C00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    textAlign: 'center',
  },
  subtitle: { color: '#E0E0E0', textAlign: 'center', marginTop: 8, marginBottom: 16 },
  label: { display: 'block', marginBottom: 8, color: '#FFFFFF', fontSize: 14 },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    border: '1px solid #4A4A4A',
    background: '#3A3A3A',
    color: '#FFFFFF',
  },
  btnPrimary: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg,#FFD700,#FF8C00)',
    color: '#1A1A1A',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(255,215,0,0.25)',
  },
  btnOutline: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    background: 'transparent',
    color: '#FFD700',
    border: '2px solid #FFD700',
    cursor: 'pointer',
  },
  linkRow: { textAlign: 'center', marginTop: 12 },
  socialBtn: {
    width: '100%',
    padding: 10,
    background: '#3A3A3A',
    border: '1px solid #4A4A4A',
    borderRadius: 10,
    color: '#FFFFFF',
    cursor: 'pointer',
  },
}

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await login({ email, password })
    setLoading(false)
    if (res.ok) navigate('/')
    else setError(res.error || '로그인 실패')
  }

  return (
    <div className="tw-card" style={{ ...styles.card, boxShadow:'none' }}>
      <h1 style={styles.logo}>ThinkWise</h1>
      <div style={styles.subtitle}>데이터 기반 인사이트, 지금 바로 시작하세요.</div>
      <form onSubmit={onSubmit}>
        <label style={styles.label}>이메일 주소</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} style={styles.input} placeholder="이메일을 입력하세요" />
        <label style={{ ...styles.label, marginTop: 12 }}>비밀번호</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={styles.input} placeholder="비밀번호를 입력하세요" />
        {error && <div style={{ color: '#F44336', marginTop: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} className="tw-btn tw-btn--primary" style={{ width:'100%', marginTop:16 }}>{loading ? '로그인 중...' : '로그인'}</button>
        <div style={styles.linkRow}>
          <button type="button" onClick={()=>alert('데모: 비밀번호 재설정')} style={styles.btnOutline}>비밀번호를 잊으셨나요?</button>
        </div>
      </form>
      <div style={{ margin: '16px 0', color: '#BDBDBD', textAlign: 'center' }}>간편 로그인</div>
      <div style={{ display: 'grid', gap: 8 }}>
        <button className="tw-btn" style={{ ...styles.socialBtn }}>🔍 Google로 로그인</button>
        <button className="tw-btn" style={{ ...styles.socialBtn }}>🟢 Naver로 로그인</button>
        <button className="tw-btn" style={{ ...styles.socialBtn }}>🟡 Kakao로 로그인</button>
      </div>
      <div style={{ marginTop: 16, borderTop: '1px solid #3A3A3A', paddingTop: 12, textAlign: 'center', color: '#E0E0E0' }}>
        아직 계정이 없으신가요? <button onClick={()=>navigate('/signup')} style={{ background:'none', border:'none', color:'#FFD700', cursor:'pointer' }}>무료로 가입하기</button>
      </div>
    </div>
  )
}

const LoginPage = () => (
  <AppLayout>
    <LoginForm />
  </AppLayout>
)

export default LoginPage



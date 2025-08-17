// 환경에 따라 자동으로 백엔드 호스트를 맞춥니다(127.0.0.1/localhost 모두 대응)
const runtimeHost = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : 'localhost'
export const API_BASE = import.meta.env.VITE_API_BASE || `http://${runtimeHost}:5050/api`

function authHeader() {
  const token = localStorage.getItem('tw_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: 'include', headers: { ...authHeader() } })
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    credentials: 'include',
    body: JSON.stringify(body || {})
  })
  const data = await res.json().catch(()=>({}))
  if (!res.ok) throw new Error(data?.message || `POST ${path} ${res.status}`)
  return data
}

export async function apiPut(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    credentials: 'include',
    body: JSON.stringify(body || {})
  })
  const data = await res.json().catch(()=>({}))
  if (!res.ok) throw new Error(data?.message || `PUT ${path} ${res.status}`)
  return data
}



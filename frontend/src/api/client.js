export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5050/api'

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



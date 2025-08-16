import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { apiGet, apiPost } from '../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('tw_token')
    if (!token) { setReady(true); return }
    apiGet('/auth/me')
      .then(r => setUser(r.data.user))
      .catch(()=>{ localStorage.removeItem('tw_token') })
      .finally(()=> setReady(true))
  }, [])

  const login = async ({ email, password }) => {
    try {
      const res = await apiPost('/auth/login', { email, password })
      const { token, user: u } = res.data
      localStorage.setItem('tw_token', token)
      setUser(u)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  }

  const register = async ({ name, email, password, company }) => {
    try {
      const res = await apiPost('/auth/register', { name, email, password, company })
      const { token, user: u } = res.data
      localStorage.setItem('tw_token', token)
      setUser(u)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('tw_token')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout, ready }), [user, ready])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)



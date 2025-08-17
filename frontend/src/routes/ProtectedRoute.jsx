import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />
  }
  return children
}

export default ProtectedRoute



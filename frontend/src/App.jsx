import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import WelcomePage from './pages/Welcome/WelcomePage'
import LoginPage from './pages/Auth/LoginPage'
import { AuthProvider } from './contexts/AuthContext'
import NewsSearch from './pages/News/NewsSearch'
import DashboardPage from './pages/Dashboard/DashboardPage'
import AnalysisPage from './pages/Analysis/AnalysisPage'
import SignupPage from './pages/Auth/SignupPage'
import CommunityPage from './pages/Community/CommunityPage'
import ProtectedRoute from './routes/ProtectedRoute'
import PricingPage from './pages/Pricing/PricingPage'
import PostDetail from './pages/Community/PostDetail'
import NewPost from './pages/Community/NewPost'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<AppLayout><WelcomePage /></AppLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/news" element={<NewsSearch />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="/community/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
            <Route path="/community/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App


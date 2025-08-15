import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ChatPage from './pages/Chat/ChatPage'
import Step1KeywordAnalysis from './pages/ReportFlow/Step1KeywordAnalysis'
import Step2ReportSetup from './pages/ReportFlow/Step2ReportSetup'
import Step3Visualization from './pages/ReportFlow/Step3Visualization'
import Step4Completion from './pages/ReportFlow/Step4Completion'
import SettingsPage from './pages/Settings/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/report/step1" element={<Step1KeywordAnalysis />} />
            <Route path="/report/step2" element={<Step2ReportSetup />} />
            <Route path="/report/step3" element={<Step3Visualization />} />
            <Route path="/report/step4" element={<Step4Completion />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


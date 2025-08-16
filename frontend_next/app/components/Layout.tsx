import Header from './Header'
import Sidebar from './Sidebar'
import React from 'react'

export default function Layout({ children }:{ children: React.ReactNode }){
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Sidebar />
      <main className="max-w-6xl mx-auto px-4 pt-6 content-with-sidebar">
        {children}
      </main>
    </div>
  )
}



import React, { useState } from 'react'
import HeaderBar from './HeaderBar'
import SideNav from './SideNav'

const AppLayout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div style={{ display: 'flex' }}>
      <SideNav expanded={isSidebarExpanded} setExpanded={setIsSidebarExpanded} />
      <div style={{ flex: 1, minHeight: '100vh', marginLeft: isSidebarExpanded ? 256 : 72, transition: 'margin-left .25s ease' }}>
        <HeaderBar />
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  )
}

export default AppLayout



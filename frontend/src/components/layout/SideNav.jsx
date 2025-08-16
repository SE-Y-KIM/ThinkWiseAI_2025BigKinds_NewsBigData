import React from 'react'
import { MessageSquare, LayoutDashboard, FolderArchive, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const SideNav = ({ expanded, setExpanded }) => {
  const items = [
    { icon: <MessageSquare size={20} />, text: '분석', href: '/analysis' },
    { icon: <LayoutDashboard size={20} />, text: '대시보드', href: '/dashboard' },
    { icon: <FolderArchive size={20} />, text: '뉴스', href: '/news' },
    { icon: <Users size={20} />, text: '커뮤니티', href: '/community' },
  ]

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: expanded ? 256 : 72,
      background: '#2C2C2C',
      borderRight: '1px solid #3A3A3A',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width .25s ease',
      zIndex: 15,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', padding: 12, height: 60, justifyContent: expanded ? 'space-between' : 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#FFD700', opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0, overflow: 'hidden' }}>ThinkWise</span>
          <button onClick={() => setExpanded(!expanded)} style={{ padding: 8, borderRadius: 10, border: 'none', background: 'transparent', color: '#E0E0E0', cursor: 'pointer' }}>≡</button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: expanded ? 'stretch' : 'center', gap: 8, padding: '8px 8px' }}>
          {items.map(item => (
            <Link key={item.text} to={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#E0E0E0', textDecoration: 'none', padding: expanded ? '0 12px' : 0, height: 44, borderRadius: 10 }}>
              {item.icon}
              <span style={{ marginLeft: 4, whiteSpace: 'nowrap', overflow: 'hidden', opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}>{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#E0E0E0' }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: 'linear-gradient(135deg,#FFD700,#FF8C00)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', fontWeight: 700 }}>유</div>
          <div style={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0, overflow: 'hidden' }}>
            <div style={{ fontSize: 12, color: '#FFFFFF' }}>유병욱</div>
            <div style={{ fontSize: 12, background: 'linear-gradient(135deg,#FFD700,#FF8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pro Plan</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideNav



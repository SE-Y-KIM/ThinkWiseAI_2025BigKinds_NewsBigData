'use client';

import { usePathname } from 'next/navigation';
import { PanelLeftClose, PanelRightClose, MessageSquarePlus, LayoutDashboard, History, Users } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <MessageSquarePlus size={22} />, text: '새 분석', href: '/' },
    { icon: <LayoutDashboard size={22} />, text: '분석 대시보드', href: '/dashboard' },
    { icon: <History size={22} />, text: '대화기록', href: '/history' },
    { icon: <Users size={22} />, text: '커뮤니티', href: '/community' },
  ];

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-surface flex flex-col justify-between border-r border-border-color transition-all duration-300 z-10`}
      style={{ width: isExpanded ? '16rem' : '5rem' }}
    >
      <div>
        <div className="flex items-center p-4 h-[60px]" style={{ justifyContent: isExpanded ? 'space-between' : 'center' }}>
          <span className={`font-bold text-lg overflow-hidden transition-opacity text-primary ${!isExpanded && 'opacity-0 w-0'}`}>
            ThinkWise
          </span>
          <button onClick={handleToggleSidebar} className="p-1.5 rounded-lg hover:bg-background text-text-secondary hover:text-primary transition-colors hover:shadow-lg hover:shadow-primary/30">
            {isExpanded ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
          </button>
        </div>
        
        <nav className="flex flex-col items-center py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a 
                key={item.text} 
                href={item.href} 
                className={`flex items-center w-full h-12 my-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background relative transition-all duration-300 ${isExpanded ? 'px-4' : 'justify-center'}`}
              >
                {isActive && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-lg shadow-primary/50"></div>}
                <div className={`${isActive ? 'text-primary' : ''}`}>{item.icon}</div>
                <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden transition-all ${!isExpanded && 'opacity-0 w-0'}`}>
                  {item.text}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

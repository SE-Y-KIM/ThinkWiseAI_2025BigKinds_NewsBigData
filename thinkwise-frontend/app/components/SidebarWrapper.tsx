'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <>
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={handleToggleSidebar} 
      />
      <main 
        className={`flex-1 h-screen overflow-hidden transition-all duration-300`}
        style={{ marginLeft: isSidebarExpanded ? '16rem' : '5rem' }}
      >
        {children}
      </main>
    </>
  );
}

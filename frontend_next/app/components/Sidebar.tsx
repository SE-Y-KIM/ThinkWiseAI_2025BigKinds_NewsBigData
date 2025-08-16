"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar(){
  const [open,setOpen]=useState(false)
  return (
    <aside className={`fixed left-0 top-14 h-[calc(100vh-56px)] bg-zinc-900 border-r border-zinc-700 transition-all ${open?'w-64':'w-16'}`}
      onTransitionEnd={()=>{
        // CSS 변수로 사이드바 폭을 노출하여 본문 패딩을 동기화
        const width = open ? '16rem' : '4rem'
        document.documentElement.style.setProperty('--sidebar-width', width)
      }}
    >
      <div className="p-2 flex justify-end">
        <button className="tw-btn border border-yellow-400 text-yellow-400" onClick={()=>setOpen(!open)}>≡</button>
      </div>
      <nav className="px-2 flex flex-col gap-2">
        <Link href="/" className="tw-btn hover:bg-zinc-800">🏠 <span className={`${open?'inline':'hidden'} ml-2`}>홈</span></Link>
        <Link href="/dashboard" className="tw-btn hover:bg-zinc-800">📊 <span className={`${open?'inline':'hidden'} ml-2`}>분석 대시보드</span></Link>
        <Link href="/reports/history" className="tw-btn hover:bg-zinc-800">🗂️ <span className={`${open?'inline':'hidden'} ml-2`}>대화기록/리포트</span></Link>
        <Link href="/community" className="tw-btn hover:bg-zinc-800">👥 <span className={`${open?'inline':'hidden'} ml-2`}>커뮤니티</span></Link>
      </nav>
    </aside>
  )
}



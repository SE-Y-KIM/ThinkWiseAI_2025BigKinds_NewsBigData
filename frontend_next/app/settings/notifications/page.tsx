"use client"
import { useState } from 'react'
import Layout from '../../components/Layout'

export default function NotificationsPage(){
  const [status,setStatus]=useState<string>("")
  const [types,setTypes]=useState({ done:true, comment:true, ai:false, billing:true })
  const [channels,setChannels]=useState({ email:true, push:true })
  const toggle=(key:keyof typeof types)=> setTypes(s=>({ ...s, [key]: !s[key] }))
  const toggleChannel=(key:keyof typeof channels)=> setChannels(s=>({ ...s, [key]: !s[key] }))
  const save=()=>{ setStatus('알림 설정이 저장되었습니다.'); setTimeout(()=>setStatus(''),2000) }
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">알림 설정</h1>
          <p className="text-zinc-400 mt-2">이메일과 앱 푸시 알림을 원하는 방식으로 설정하세요.</p>
        </div>

        {status && <div className="tw-card text-center text-yellow-300">{status}</div>}

        <section className="tw-card space-y-4">
          <h2 className="text-xl font-bold text-yellow-400">알림 유형</h2>
          {[
            ['done','리포트 생성 완료 알림'],
            ['comment','커뮤니티 댓글 알림'],
            ['ai','AI 분석 제안 알림'],
            ['billing','결제·구독 관련 알림'],
          ].map(([k,label])=> (
            <div key={k} className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-0">
              <div className="text-zinc-200">{label as string}</div>
              <button onClick={()=>toggle(k as any)} className={`w-12 h-6 rounded-full ${types[k as keyof typeof types]?'bg-yellow-400':'bg-zinc-600'}`}>
                <span className={`block w-5 h-5 bg-white rounded-full transition ${types[k as keyof typeof types]?'translate-x-6':'translate-x-1'}`}></span>
              </button>
            </div>
          ))}
        </section>

        <section className="tw-card space-y-4">
          <h2 className="text-xl font-bold text-yellow-400">수신 채널</h2>
          {[
            ['email','이메일'],
            ['push','앱 푸시'],
          ].map(([k,label])=> (
            <div key={k} className="flex items-center justify-between py-2">
              <div className="text-zinc-200">{label as string}</div>
              <button onClick={()=>toggleChannel(k as any)} className={`w-6 h-6 rounded border ${channels[k as keyof typeof channels]?'bg-yellow-400 border-yellow-400':'bg-transparent border-zinc-600'}`}></button>
            </div>
          ))}
        </section>

        <div className="flex gap-3">
          <button onClick={save} className="tw-btn tw-btn-primary">설정 저장</button>
        </div>
      </div>
    </Layout>
  )
}



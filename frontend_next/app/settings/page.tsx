"use client"
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function SettingsPage(){
  const [status,setStatus]=useState<string>("")
  const [account,setAccount]=useState({ name:'김사용자', email:'user@example.com', company:'' })
  const [security,setSecurity]=useState({ current:'', next:'', confirm:'' })
  const save=(msg:string)=>{ setStatus(msg); setTimeout(()=>setStatus(''),2000) }

  useEffect(()=>{ /* placeholder for load */ }, [])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">설정</h1>
          <p className="text-zinc-400 mt-2">계정 정보와 사용자 설정을 관리하세요.</p>
        </div>

        {status && <div className="tw-card text-center text-yellow-300">{status}</div>}

        <div className="grid md:grid-cols-2 gap-4">
          <section className="tw-card">
            <h2 className="text-xl font-bold mb-4">계정 설정</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-zinc-300">이름</label>
                <input className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={account.name} onChange={e=>setAccount({...account,name:e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-zinc-300">이메일</label>
                <input className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={account.email} onChange={e=>setAccount({...account,email:e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-zinc-300">회사/조직 (선택)</label>
                <input className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={account.company} onChange={e=>setAccount({...account,company:e.target.value})} />
              </div>
              <div className="flex gap-2">
                <button onClick={()=>save('계정 정보가 저장되었습니다.')} className="tw-btn tw-btn-primary">정보 저장</button>
                <button onClick={()=>setAccount({ name:'김사용자', email:'user@example.com', company:'' })} className="tw-btn border border-zinc-600">초기화</button>
              </div>
            </div>
          </section>

          <section className="tw-card">
            <h2 className="text-xl font-bold mb-4">보안 설정</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-zinc-300">현재 비밀번호</label>
                <input type="password" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={security.current} onChange={e=>setSecurity({...security,current:e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-zinc-300">새 비밀번호</label>
                <input type="password" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={security.next} onChange={e=>setSecurity({...security,next:e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-zinc-300">새 비밀번호 확인</label>
                <input type="password" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={security.confirm} onChange={e=>setSecurity({...security,confirm:e.target.value})} />
              </div>
              <button onClick={()=> security.next && security.next===security.confirm ? save('비밀번호가 변경되었습니다.') : save('새 비밀번호가 일치하지 않습니다.')} className="tw-btn tw-btn-primary">비밀번호 변경</button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}



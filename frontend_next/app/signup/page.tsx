"use client"
import { useState } from 'react'
import Layout from '../components/Layout'

export default function SignupPage(){
  const [form,setForm]=useState({ name:'', email:'', password:'', confirm:'' })
  const [status,setStatus]=useState('')
  const submit=(e:React.FormEvent)=>{
    e.preventDefault()
    if(form.password!==form.confirm){ setStatus('비밀번호가 일치하지 않습니다.'); return }
    setStatus('가입 중...')
    setTimeout(()=> setStatus('회원가입이 완료되었습니다!'), 1000)
  }
  return (
    <Layout>
      <div className="max-w-md mx-auto tw-card">
        <h2 className="text-xl font-bold mb-4">ThinkWise AI 무료 가입</h2>
        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm">이름</label>
          <input className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <label className="text-sm">이메일</label>
          <input className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" required />
          <label className="text-sm">비밀번호</label>
          <input className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" required />
          <label className="text-sm">비밀번호 확인</label>
          <input className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} type="password" required />
          <button className="tw-btn tw-btn-primary mt-2">회원가입</button>
        </form>
        {status && <div className="text-yellow-300 mt-3">{status}</div>}
      </div>
    </Layout>
  )
}



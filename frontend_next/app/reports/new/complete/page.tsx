"use client"
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'

export default function ReportCompletePage(){
  const [status,setStatus]=useState('')
  const download=()=>{ setStatus('다운로드가 시작되었습니다!'); setTimeout(()=>setStatus(''),2000) }
  const share=()=>{ setStatus('커뮤니티에 공유되었습니다.'); setTimeout(()=>setStatus(''),2000) }
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">리포트 생성 완료</h1>
          <p className="text-zinc-400 mt-2">AI 분석과 시각화가 적용된 리포트가 완성되었습니다.</p>
        </div>

        <section className="tw-card text-center">
          <div className="text-5xl mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">🎉</div>
          <div className="text-xl font-semibold">리포트가 성공적으로 생성되었습니다!</div>
          <div className="text-zinc-400">저장, 공유, 다운로드 기능을 사용해 보세요.</div>
        </section>

        <section className="tw-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">2024년 글로벌 반도체 시장 전망</div>
              <div className="text-zinc-400 text-sm">작성일: 2024-08-15</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap my-3">
            {['AI 반도체','서버 수요','원자재 가격'].map(k=> <span key={k} className="tw-chip">{k}</span>)}
          </div>
          <p className="text-zinc-300">글로벌 반도체 시장은 AI 데이터센터 수요 확대로 성장세 지속 예상...</p>
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button onClick={download} className="tw-btn tw-btn-primary">📄 리포트 다운로드 (PDF)</button>
          <button onClick={share} className="tw-btn border border-zinc-600">🔗 커뮤니티에 공유</button>
          <Link href="/dashboard" className="tw-btn border border-zinc-600">📊 대시보드로 이동</Link>
        </div>

        {status && <div className="tw-card text-center text-yellow-300">{status}</div>}
      </div>
    </Layout>
  )
}



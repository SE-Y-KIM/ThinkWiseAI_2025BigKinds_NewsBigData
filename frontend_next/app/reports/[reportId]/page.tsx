"use client"
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Layout from '../../components/Layout'

export default function ReportDetailPage(){
  const params = useParams() as { reportId: string }
  const [favorited,setFavorited]=useState(false)
  const [status,setStatus]=useState('')

  const download=()=>{ setStatus('다운로드가 시작되었습니다!'); setTimeout(()=>setStatus(''),2000) }
  const share=()=>{ setStatus('리포트 링크가 공유되었습니다.'); setTimeout(()=>setStatus(''),2000) }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <section className="tw-card">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">리포트: {params.reportId}</h1>
          <div className="text-zinc-400 mb-3">작성일: 2024-08-15</div>
          <div className="flex gap-2 mb-3">
            {['AI 반도체','서버 수요','원자재 가격'].map(k=> <span key={k} className="tw-chip">{k}</span>)}
          </div>
          <div className="flex gap-2">
            <button onClick={download} className="tw-btn tw-btn-primary">📄 PDF 다운로드</button>
            <button onClick={share} className="tw-btn border border-zinc-600">🔗 공유</button>
            <button onClick={()=>setFavorited(s=>!s)} className={`tw-btn ${favorited?'tw-btn-primary':'border border-yellow-400 text-yellow-400'}`}>{favorited?'⭐ 즐겨찾기 제거':'⭐ 즐겨찾기 추가'}</button>
          </div>
        </section>

        {status && <div className="tw-card text-center text-yellow-300">{status}</div>}

        <section className="tw-card">
          <h2 className="text-lg font-bold mb-2">요약</h2>
          <p className="text-zinc-300">글로벌 반도체 시장은 AI 서버 수요 확대로 성장세. 원자재 가격과 지정학 리스크가 변수.</p>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          {["매출 추이","점유율","원자재"].map(title=> (
            <div key={title} className="tw-card">
              <div className="font-semibold mb-2">{title}</div>
              <div className="h-40 border border-yellow-500/40 rounded-lg grid place-items-center text-yellow-300">차트</div>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="tw-card">
            <div className="font-semibold text-green-400 mb-2">긍정 요인</div>
            <ul className="list-disc list-inside text-zinc-300 space-y-1">
              <li>AI 서버 수요 폭발</li>
              <li>산업 정책 지원</li>
            </ul>
          </div>
          <div className="tw-card">
            <div className="font-semibold text-red-400 mb-2">부정 요인</div>
            <ul className="list-disc list-inside text-zinc-300 space-y-1">
              <li>원자재 가격 상승</li>
              <li>무역 갈등 지속</li>
            </ul>
          </div>
          <div className="tw-card">
            <div className="font-semibold text-orange-300 mb-2">중립 시나리오</div>
            <ul className="list-disc list-inside text-zinc-300 space-y-1">
              <li>공급망 안정화 시 완만한 성장</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}



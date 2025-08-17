"use client"
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'

export default function ComposePage(){
  const [content,setContent]=useState('')
  const [saving,setSaving]=useState(false)
  const [chartReady,setChartReady]=useState(false)

  useEffect(()=>{
    const draft=localStorage.getItem('draftContent')
    setContent(draft || '2024년 글로벌 반도체 시장은 AI 서버와 데이터센터 수요 확대에 힘입어 성장할 전망입니다...')
    const t=setTimeout(()=>setChartReady(true), 1200)
    return ()=>clearTimeout(t)
  },[])

  const save=()=>{ setSaving(true); localStorage.setItem('draftContent',content); setTimeout(()=>setSaving(false),800) }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">리포트 생성 – 3단계: 시각화·본문 작성</h1>
          <p className="text-zinc-400 mt-2">AI가 생성한 시각화와 분석 본문을 편집하세요.</p>
        </div>

        <section className="tw-card">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">시각화</div>
            <div className="flex gap-2">
              <button className="tw-btn border border-zinc-600">차트 유형 변경</button>
              <button className="tw-btn border border-zinc-600">데이터 다운로드</button>
            </div>
          </div>
          <div className="h-60 bg-zinc-900 border border-zinc-700 rounded-lg grid place-items-center">
            {chartReady? <div className="text-yellow-300 font-bold text-2xl">8.4% 성장</div> : <div className="text-zinc-400">데이터 분석 및 시각화 생성 중...</div>}
          </div>
        </section>

        <section className="tw-card">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">본문 작성</div>
            <div className="flex gap-2">
              <button onClick={save} className="tw-btn tw-btn-primary">저장</button>
              <button onClick={()=>setContent('')} className="tw-btn border border-zinc-600">초기화</button>
            </div>
          </div>
          <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full min-h-64 bg-zinc-900 border border-zinc-700 rounded-lg p-3" placeholder="본문을 입력하세요" />
          {saving && <div className="text-yellow-300 mt-2">자동 저장되었습니다.</div>}
        </section>

        <div className="text-center">
          <Link href="/reports/new/complete" className="tw-btn tw-btn-primary">리포트 생성 완료하기</Link>
        </div>
      </div>
    </Layout>
  )
}



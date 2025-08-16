"use client"
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'

export default function SetupPage(){
  const [mainTopic,setMainTopic]=useState('')
  const [subtopics,setSubtopics]=useState<string[]>([])
  const [draftLoaded,setDraftLoaded]=useState(false)

  useEffect(()=>{
    const draftTopic=localStorage.getItem('draftMainTopic')||''
    const draftSubs=JSON.parse(localStorage.getItem('draftSubtopics')||'[]')
    setMainTopic(draftTopic)
    setSubtopics(draftSubs)
    setDraftLoaded(true)
  },[])

  const addSubtopic=(v='')=> setSubtopics(s=>[...s, v])
  const removeSubtopic=(i:number)=> setSubtopics(s=> s.filter((_,idx)=> idx!==i))
  const saveDraft=()=>{
    localStorage.setItem('draftMainTopic', mainTopic)
    localStorage.setItem('draftSubtopics', JSON.stringify(subtopics))
  }

  const canNext = mainTopic.trim().length>0 && subtopics.filter(s=>s.trim().length>0).length>0

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">리포트 생성 – 2단계: 주제와 소주제 설정</h1>
          <p className="text-zinc-400 mt-2">선택한 키워드 기반으로 분석 구조를 구성하세요.</p>
        </div>

        <section className="tw-card space-y-3">
          <label className="text-sm text-zinc-300">주제</label>
          <input value={mainTopic} onChange={e=>setMainTopic(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="예: 2024년 반도체 시장 전망" />
          <div className="text-zinc-400 text-sm">리포트의 전체 주제를 한 문장으로 작성하세요.</div>
        </section>

        <section className="tw-card">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">소주제 설정</div>
            <button onClick={()=>addSubtopic('')} className="tw-btn tw-btn-primary">소주제 추가</button>
          </div>
          <div className="space-y-2">
            {subtopics.map((s,idx)=> (
              <div key={idx} className="flex gap-2">
                <input value={s} onChange={e=> setSubtopics(arr=> arr.map((v,i)=> i===idx? e.target.value : v))} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="예: AI 반도체 수요" />
                <button onClick={()=>removeSubtopic(idx)} className="tw-btn border border-red-500 text-red-400">삭제</button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-zinc-400 text-sm">최대 10개 권장</div>
        </section>

        <section className="tw-card">
          <div className="font-semibold mb-2">추천 소주제</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {['글로벌 시장 성장률','주요 경쟁 구도','정책·규제 변화','원자재 가격 영향'].map(r=> (
              <button key={r} onClick={()=>addSubtopic(r)} className="tw-btn border border-zinc-600 hover:border-yellow-400">{r}</button>
            ))}
          </div>
        </section>

        <div className="flex gap-2">
          <button onClick={saveDraft} className="tw-btn border border-zinc-600">임시 저장</button>
          <Link href="/reports/new/compose" className={`tw-btn ${canNext? 'tw-btn-primary':'border border-zinc-700 text-zinc-500 pointer-events-none'}`}>다음 단계</Link>
        </div>
      </div>
    </Layout>
  )
}



"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'

type Report = { id:string; title:string; date:string; keywords:string[]; summary:string }

const MOCK: Report[] = [
  { id:'report1', title:'2024년 글로벌 반도체 시장 전망', date:'2024-08-15', keywords:['AI 반도체','서버 수요','원자재 가격'], summary:'AI 데이터센터 수요 확대로 성장세 전망' },
  { id:'report2', title:'ESG 투자 트렌드 분석', date:'2024-08-10', keywords:['ESG','지속가능 투자','기업 가치'], summary:'ESG는 장기 가치창출의 핵심' },
  { id:'report3', title:'메타버스 기술 발전 현황', date:'2024-08-05', keywords:['메타버스','VR/AR','플랫폼'], summary:'교육·의료·업무로 확장' },
]

export default function ReportsHistoryPage(){
  const [q,setQ]=useState('')
  const results = useMemo(()=>{
    const term=q.trim().toLowerCase()
    if(!term) return MOCK
    return MOCK.filter(r=> [r.title,r.summary,...r.keywords].join(' ').toLowerCase().includes(term))
  },[q])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">리포트 히스토리</h1>
          <p className="text-zinc-400 mt-2">생성한 리포트를 확인하고 관리하세요.</p>
        </div>
        <section className="tw-card">
          <div className="flex flex-col sm:flex-row gap-3">
            <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="리포트 제목이나 키워드로 검색" />
            <button className="tw-btn tw-btn-primary">검색</button>
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-4">
          {results.map(r=> (
            <Link href={`/reports/${r.id}`} key={r.id} className="tw-card hover:border-yellow-500 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <div className="text-zinc-400 text-sm">{r.date}</div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap my-2">
                {r.keywords.map(k=> <span key={k} className="tw-chip">{k}</span>)}
              </div>
              <p className="text-zinc-300">{r.summary}</p>
              <div className="mt-3 flex gap-2">
                <button className="tw-btn border border-zinc-600">🔗 공유</button>
                <button className="tw-btn border border-zinc-600">📄 PDF</button>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  )
}



"use client"
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Layout from '../components/Layout'
import AnalysisResult from '../components/AnalysisResult'

export default function AnalysisPage(){
  const sp = useSearchParams()
  const router = useRouter()
  const q = sp.get('q') || ''
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string>('')
  const [data,setData]=useState<any>(null)

  useEffect(()=>{
    const run = async ()=>{
      if(!q){ setError('질문이 비어 있습니다.'); return }
      setLoading(true); setError(''); setData(null)
      try{
        const res = await fetch(`/api/analysis/stock?q=${encodeURIComponent(q)}`, { headers:{'Accept':'application/json'} })
        const json = await res.json()
        if(!json?.ok){ throw new Error(`HTTP ${json?.status || 'error'}`) }
        setData(json.data)
      }catch(e:any){
        setError(e?.message || '분석 중 오류가 발생했습니다')
      }finally{ setLoading(false) }
    }
    void run()
  },[q])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="text-sm text-zinc-400">질문</div>
        <div className="tw-card">{q}</div>
        {loading && <div className="tw-card">분석 중...</div>}
        {error && <div className="tw-card text-red-400">{error}</div>}
        {data && <AnalysisResult data={typeof data==='string'? data : JSON.stringify(data)} />}
      </div>
    </Layout>
  )
}



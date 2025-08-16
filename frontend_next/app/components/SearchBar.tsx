"use client"
import { useState } from 'react'
import AnalysisResult from './AnalysisResult'
import { useRouter } from 'next/navigation'

export default function SearchBar(){
  const router = useRouter()
  const [query,setQuery]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|undefined>()
  const [result,setResult]=useState<string>('')

  const run = async () => {
    if(!query.trim()) return
    setLoading(true); setError(undefined); setResult('')
    try{
      // 분석 전용 페이지로 이동
      router.push(`/analysis?q=${encodeURIComponent(query)}`)
      return
    }catch(e:any){
      setError(e?.message || '요청 중 오류가 발생했습니다')
    }finally{ setLoading(false) }
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      void run()
    }
  }

  return (
    <div className="w-full">
      <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-2 shadow-lg flex gap-3">
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-lg"
          placeholder="예: 최근 삼성전자 주가는 왜 올랐어?"
        />
        <button onClick={run} disabled={loading} className="tw-btn tw-btn-primary">{loading? '분석 중...' : '분석'}</button>
      </div>
      {(error || result) && (
        <div className="mt-3">
          {error? <div className="tw-card text-red-400">{error}</div> : <AnalysisResult data={result} />}
        </div>
      )}
    </div>
  )
}



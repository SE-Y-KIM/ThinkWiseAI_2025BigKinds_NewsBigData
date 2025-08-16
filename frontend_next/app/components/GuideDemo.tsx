"use client"
import { useState } from 'react'

const SAMPLE_PROMPTS = [
  'AI 반도체 관련 최근 뉴스 핵심 5줄로 요약해줘',
  '삼성전자 vs SK하이닉스 2024년 실적 전망 표로 비교해줘',
  'WTI 하락이 국내 정유주에 미치는 영향 3가지',
]

export default function GuideDemo(){
  const [prompt,setPrompt]=useState('')
  const [answer,setAnswer]=useState<string>('')
  const [running,setRunning]=useState(false)

  const run = async () => {
    if(!prompt.trim()) return
    setRunning(true)
    setAnswer('')
    // 데모용 로컬 시뮬레이션
    await new Promise(r=>setTimeout(r,400))
    setAnswer('데모 응답: 실제 서비스에서는 뉴스/데이터 근거와 함께 요약·표·차트가 제공됩니다.\n- 근거 1) ...\n- 근거 2) ...')
    setRunning(false)
  }

  return (
    <div className="tw-card">
      <div className="flex flex-wrap gap-2 mb-3">
        {SAMPLE_PROMPTS.map(p=> (
          <button key={p} onClick={()=>setPrompt(p)} className="tw-btn border border-zinc-600 hover:border-yellow-400">
            {p}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="프롬프트를 입력하거나 샘플을 선택하세요" />
        <button onClick={run} className="tw-btn tw-btn-primary" disabled={running}>{running? '분석 중...' : '실행'}</button>
      </div>
      <div className="mt-3 min-h-[96px] bg-zinc-900 border border-zinc-800 rounded-lg p-3 whitespace-pre-wrap text-zinc-200">
        {answer || '분석 결과가 여기에 표시됩니다.'}
      </div>
    </div>
  )
}



"use client"
import React from 'react'
import Sparkline from './Sparkline'

type Indicator = {
  label: string
  code: string
  value: string
  changePct: number
  series: number[]
}

export default function MacroIndicators(){
  const [items, setItems] = React.useState<Indicator[]|null>(null)
  const [error, setError] = React.useState<string>('')
  React.useEffect(()=>{
    const demo: Indicator[] = [
      { label: '코스피', code: 'KOSPI', value: '3,249.65', changePct: +1.65, series: [9,8,10,7,6,7,9,8,10,9,11,10] },
      { label: '미국 10년', code: 'US10Y', value: '2.83%', changePct: -0.80, series: [7,6,6.5,6.2,6.8,6.1,5.9,6.3,6.1,6.0,6.2,6.1] },
      { label: 'WTI', code: 'WTI', value: '$66.13', changePct: +1.49, series: [5,4.8,4.7,4.4,4.2,4.5,4.3,4.0,3.9,4.1,4.3,4.2] },
      { label: '환율(USD)', code: 'USDKRW', value: '1383.24', changePct: -0.23, series: [8,8.2,8.4,8.3,8.5,8.6,8.4,8.7,8.9,8.8,8.7,8.9] },
    ]
    fetch(process.env.NEXT_PUBLIC_API_BASE ? `${process.env.NEXT_PUBLIC_API_BASE}/macro/kpi` : 'http://localhost:5050/api/macro/kpi')
      .then(r=>r.json())
      .then((j)=>{
        if(j && j.ok){ setItems(j.items) } else { setError(j?.error||'로드 실패'); setItems(demo) }
      })
      .catch(e=> { setError(String(e)); setItems(demo) })
  },[])

  const data = items ?? []
  return (
    <section className="max-w-6xl mx-auto mt-8">
      <div className="flex items-center justify-between text-zinc-400 text-sm mb-3 px-1">
        <div className="font-semibold text-zinc-200">주요 거시경제 지표</div>
        <div>{items? '마지막 업데이트: 실시간':'데모 데이터/연결 중...'}</div>
      </div>
      {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(data.length? data: [] ).map(it=>{
          const negative = it.changePct < 0
          const stroke = negative? '#ef4444' : '#22c55e'
          return (
            <div key={it.code} className="tw-card">
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                <span>{it.label}</span>
                <span className="uppercase">{it.code}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{it.value}</div>
              <div className={`text-sm ${negative? 'text-red-400':'text-green-400'}`}>{negative? '▼': '▲'} {Math.abs(it.changePct).toFixed(2)}%</div>
              <div className="mt-2">
                <Sparkline points={it.series || []} stroke={stroke} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-center text-zinc-500 text-xs mt-2">yfinance 기반 실시간에 근접한 종가/변화율/스파크라인 표시</div>
    </section>
  )
}



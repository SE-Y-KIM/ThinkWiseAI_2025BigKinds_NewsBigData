"use client"
import { useState } from 'react'
import type { ReactNode } from 'react'
import Sparkline from './Sparkline'

type AnyRecord = Record<string, any>

function MetricCard({ m }:{ m: AnyRecord }){
  const negative = (typeof m.change === 'number' ? m.change < 0 : /-/g.test(String(m.change||'')))
  const stroke = negative ? '#ef4444' : '#22c55e'
  const formatValue=(v:any, unit?:string, decimals=2)=>{
    if(v==null) return '-'
    if(typeof v === 'number'){
      const n = Number(v.toFixed(decimals))
      const s = Math.abs(n) >= 1000 ? n.toLocaleString() : n
      return unit? `${s}${unit}`: String(s)
    }
    return unit? `${v}${unit}`: String(v)
  }
  return (
    <div className="tw-card min-w-[240px]">
      <div className="flex items-center justify-between text-sm text-zinc-400 mb-1">
        <span>{m.label || m.name || '지표'}</span>
        {m.code && <span className="uppercase">{m.code}</span>}
      </div>
      <div className="text-2xl font-bold">{formatValue(m.value, m.unit, m.decimals ?? 2)}</div>
      {m.change !== undefined && (
        <div className={`text-sm ${negative? 'text-red-400':'text-green-400'}`}>{negative? '▼':'▲'} {`${Math.abs(Number(m.change)).toFixed(m.decimals ?? 2)}${m.changeUnit ?? '%'}`}</div>
      )}
      {Array.isArray(m.series) && m.series.length>1 && (
        <div className="mt-2"><Sparkline points={m.series} stroke={stroke}/></div>
      )}
    </div>
  )
}

export default function MetricsSection({ metrics }:{ metrics: AnyRecord[] }){
  const [layout,setLayout]=useState<'2'|'4'|'slide'>('4')

  let content: ReactNode
  if(layout==='slide'){
    content = (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {metrics.map((m,i)=> (<MetricCard key={i} m={m} />))}
      </div>
    )
  }else{
    const cols = layout==='2' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'
    content = (
      <div className={`grid grid-cols-1 ${cols} gap-4`}>
        {metrics.map((m,i)=> (<MetricCard key={i} m={m} />))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
        <div>주요 지표</div>
        <div className="flex items-center gap-2">
          <button className={`tw-btn border ${layout==='2'?'border-yellow-400':'border-zinc-600'}`} onClick={()=>setLayout('2')}>2열</button>
          <button className={`tw-btn border ${layout==='4'?'border-yellow-400':'border-zinc-600'}`} onClick={()=>setLayout('4')}>4열</button>
          <button className={`tw-btn border ${layout==='slide'?'border-yellow-400':'border-zinc-600'}`} onClick={()=>setLayout('slide')}>슬라이드</button>
        </div>
      </div>
      {content}
    </div>
  )
}



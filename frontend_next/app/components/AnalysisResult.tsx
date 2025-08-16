"use client"
import { useState } from 'react'
import Sparkline from './Sparkline'
import { TrendLine } from './Charts'
import MetricsSection from './MetricsSection'

type AnyRecord = Record<string, any>

function formatValue(value:any, unit?:string, decimals=2){
  if(value==null) return '-'
  if(typeof value === 'number'){
    const num = typeof value === 'number' ? Number(value.toFixed(decimals)) : Number(value)
    const v = Math.abs(num) >= 1000 ? num.toLocaleString() : num
    return unit? `${v}${unit}` : String(v)
  }
  return unit? `${value}${unit}` : String(value)
}

function MetricCard({ m }:{ m: AnyRecord }){
  const negative = (typeof m.change === 'number' ? m.change < 0 : /-/g.test(String(m.change||'')))
  const stroke = negative ? '#ef4444' : '#22c55e'
  return (
    <div className="tw-card">
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

export default function AnalysisResult({ data }:{ data: any }){
  const [showRaw,setShowRaw]=useState(false)
  const isString = typeof data === 'string'
  let obj: AnyRecord | undefined
  if(!isString){ obj = data as AnyRecord }
  else{
    try{ obj = JSON.parse(data); }catch{ obj = undefined }
  }

  if(isString && !obj){
    return <div className="tw-card whitespace-pre-wrap">{String(data)}</div>
  }

  const summary = obj?.summary || obj?.overview || obj?.result || obj?.answer
  const bullets: string[] = obj?.highlights || obj?.points || obj?.bulletPoints || []
  const metrics: AnyRecord[] = obj?.metrics || obj?.indicators || []
  const articles: AnyRecord[] = obj?.articles || obj?.news || []
  const series: number[] = obj?.series || obj?.timeseries || []
  const labels: string[] = obj?.labels || []

  return (
    <div className="space-y-4">
      {summary && (
        <div className="tw-card"><div className="text-lg font-semibold mb-1">요약</div><div className="text-zinc-200 whitespace-pre-wrap">{summary}</div></div>
      )}
      {Array.isArray(bullets) && bullets.length>0 && (
        <div className="tw-card">
          <div className="text-lg font-semibold mb-2">핵심 포인트</div>
          <ul className="list-disc list-inside text-zinc-200 space-y-1">
            {bullets.map((b,i)=>(<li key={i}>{b}</li>))}
          </ul>
        </div>
      )}
      {Array.isArray(metrics) && metrics.length>0 && (
        <MetricsSection metrics={metrics} />
      )}
      {Array.isArray(series) && series.length>1 && (
        <div className="tw-card">
          <div className="text-lg font-semibold mb-2">추세</div>
          {labels.length===series.length
            ? <TrendLine labels={labels} data={series} color={'var(--color-neutral)'} fillArea showMarkers />
            : <Sparkline points={series} />}
        </div>
      )}
      {Array.isArray(articles) && articles.length>0 && (
        <div className="tw-card">
          <div className="text-lg font-semibold mb-2">관련 뉴스</div>
          <ul className="space-y-2">
            {articles.map((a,i)=> (
              <li key={i} className="text-zinc-200">
                {a.url ? <a href={a.url} target="_blank" className="underline hover:text-yellow-400">{a.title || a.headline || '기사 링크'}</a> : (a.title || a.headline)}
                {a.source && <span className="text-zinc-400 text-sm"> · {a.source}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={()=>setShowRaw(v=>!v)} className="tw-btn border border-zinc-600">{showRaw? '원본 숨기기':'원본 보기'}</button>
      {showRaw && (
        <div className="tw-card whitespace-pre-wrap text-zinc-300 text-sm">{JSON.stringify(obj, null, 2)}</div>
      )}
    </div>
  )
}



"use client"
import React from 'react'

type Props = { points: number[]; stroke?: string }

export default function Sparkline({ points, stroke = '#22c55e' }: Props){
  const width = 160
  const height = 48
  if(points.length === 0){
    return <div className="text-zinc-500 text-xs">데이터 없음</div>
  }
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)
  const d = points.map((v,i)=>{
    const x = i * step
    const y = height - ((v - min) / range) * height
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}



"use client"
import React from 'react'

type Props = {
  points: number[]
  width?: number
  height?: number
  stroke?: string
}

export default function Sparkline({ points, width = 160, height = 48, stroke = '#22c55e' }: Props){
  if(points.length === 0){
    return <svg width={width} height={height}></svg>
  }
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)
  const path = points.map((p, i) => {
    const x = i * stepX
    const y = height - ((p - min) / range) * height
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`
  const fill = stroke === '#ef4444' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)'
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={fillPath} fill={fill}></path>
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} />
    </svg>
  )
}



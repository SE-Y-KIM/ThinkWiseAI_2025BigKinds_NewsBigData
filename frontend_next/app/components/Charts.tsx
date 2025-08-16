"use client"
import {
  Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import React from 'react'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

export function TrendLine({ labels, data, color = 'var(--color-up)', showLegend = false, showGrid = true, yUnit = '', decimals = 2, fillArea = true, showMarkers = true }:{ labels: string[]; data: number[]; color?: string; showLegend?: boolean; showGrid?: boolean; yUnit?: string; decimals?: number; fillArea?: boolean; showMarkers?: boolean }){
  const options = {
    responsive: true,
    plugins: {
      legend: { display: showLegend },
      tooltip: { enabled: true, callbacks: { label: (ctx:any) => {
        const v = typeof ctx.parsed.y === 'number' ? ctx.parsed.y.toFixed(decimals) : ctx.parsed.y
        return `${v}${yUnit}`
      } } }
    },
    scales: {
      x: { display: true, ticks: { color: '#a1a1aa' }, grid: { color: showGrid? 'rgba(255,255,255,0.06)':'transparent' } },
      y: { display: true, ticks: { color: '#a1a1aa' }, grid: { color: showGrid? 'rgba(255,255,255,0.06)':'transparent' } }
    }
  } as const
  const dataset = {
    labels,
    datasets: [{ data, borderColor: color, backgroundColor: color, tension: 0.3, pointRadius: showMarkers? 3 : 0, pointBackgroundColor: color, pointHoverRadius: showMarkers? 4:0, fill: fillArea ? { target: 'origin', above: 'rgba(34,197,94,0.08)' } : false }]
  }
  return <Line options={options} data={dataset} />
}



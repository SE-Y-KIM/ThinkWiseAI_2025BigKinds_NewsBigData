import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ThinkWise',
  description: '뉴스 빅데이터 AI 분석',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}



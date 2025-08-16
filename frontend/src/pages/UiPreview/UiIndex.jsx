import React from 'react'
import { Link } from 'react-router-dom'

const TOTAL_PAGES = 23

function UiIndex() {
  const pageNumbers = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1)

  return (
    <div style={{ padding: '24px', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>UI 미리보기 목록 (총 {TOTAL_PAGES}개)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
        {pageNumbers.map((n) => (
          <Link key={n} to={`/ui/${n}`} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, textAlign: 'center', textDecoration: 'none', color: '#111827', background: '#fff' }}>
            UI {n}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UiIndex



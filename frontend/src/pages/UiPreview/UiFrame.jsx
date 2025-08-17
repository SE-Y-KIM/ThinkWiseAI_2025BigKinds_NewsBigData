import React from 'react'
import { useParams, Link } from 'react-router-dom'

// UI html 파일은 src/pages/ui/ui_{id}.html 경로에 그대로 존재합니다.
// Vite에서는 public 디렉토리 외 파일을 iframe src로 로드할 때 경로 해석 이슈가 있을 수 있어
// 동적 import로 파일을 asset으로 번들에 포함시킨 후 blob URL로 렌더링합니다.

function useUiHtmlBlobUrl(id) {
  const [blobUrl, setBlobUrl] = React.useState('')

  React.useEffect(() => {
    let revokedUrl = ''

    async function load() {
      try {
        const module = await import(`../ui/ui_${id}.html?raw`)
        const html = module.default || module
        const blob = new Blob([html], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        revokedUrl = url
        setBlobUrl(url)
      } catch (e) {
        setBlobUrl('')
      }
    }
    load()

    return () => {
      if (revokedUrl) URL.revokeObjectURL(revokedUrl)
    }
  }, [id])

  return blobUrl
}

function UiFrame() {
  const { id } = useParams()
  const blobUrl = useUiHtmlBlobUrl(id)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/ui" style={{ textDecoration: 'none' }}>← 목록</Link>
        <div style={{ opacity: 0.6 }}>ui_{id}.html</div>
      </div>
      <div style={{ flex: 1 }}>
        {blobUrl ? (
          <iframe title={`ui_${id}`} src={blobUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
        ) : (
          <div style={{ padding: 24 }}>해당 UI 파일을 찾을 수 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default UiFrame



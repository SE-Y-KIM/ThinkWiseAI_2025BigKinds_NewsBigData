import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try{
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''
    const backend = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5050'
    const url = `${backend}/api/analysis/stock?q=${encodeURIComponent(q)}`

    const controller = new AbortController()
    const timeout = setTimeout(()=>controller.abort(), 15000)
    let res: Response
    try{
      res = await fetch(url, { headers: { 'Accept': 'application/json' }, cache: 'no-store', signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }

    const ct = res.headers.get('content-type') || ''
    const body = ct.includes('application/json') ? await res.json() : await res.text()
    // 프론트에서 메시지를 읽을 수 있도록 항상 200으로 내려주고 ok/status를 동봉
    return NextResponse.json({ ok: res.ok, status: res.status, data: body })
  }catch(e:any){
    return NextResponse.json({ ok:false, status: 502, error: e?.message || 'proxy_error' })
  }
}



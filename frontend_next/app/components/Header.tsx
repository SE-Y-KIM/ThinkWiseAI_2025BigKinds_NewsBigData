import Link from 'next/link'

export default function Header(){
  return (
    <header className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-700">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-extrabold text-lg bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ThinkWise</Link>
        <nav className="mx-auto flex gap-6 text-zinc-300">
          <Link href="/guide" className="hover:text-yellow-400">가이드</Link>
          <Link href="/pricing" className="hover:text-yellow-400">가격</Link>
        </nav>
        <div className="flex gap-2">
          <Link href="/login" className="tw-btn border border-yellow-400 text-yellow-400">로그인</Link>
          <Link href="/signup" className="tw-btn tw-btn-primary">무료로 시작</Link>
        </div>
      </div>
    </header>
  )
}



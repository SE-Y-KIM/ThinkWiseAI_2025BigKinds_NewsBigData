import Layout from './components/Layout'
import MacroIndicators from './components/MacroIndicators'

export default function Page(){
  return (
    <Layout>
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ThinkWise</h1>
        <p className="text-zinc-300 mt-3">뉴스 빅데이터를 AI로 분석하고 인사이트를 발견하세요</p>
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-2 shadow-lg flex gap-3">
            <input className="flex-1 bg-transparent outline-none px-3 py-2 text-lg" placeholder="뉴스 검색 또는 AI에게 질문하기..." />
            <button className="tw-btn tw-btn-primary">분석</button>
          </div>
        </div>
      </section>
      <MacroIndicators />
    </Layout>
  )
}



import Layout from '../components/Layout'

export default function SampleReportPage(){
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">샘플 리포트</h1>
          <p className="text-zinc-300 mt-2">AI가 만든 리포트 예시를 확인하세요</p>
        </section>
        <section className="grid md:grid-cols-3 gap-4">
          {[{v:'+8.4%','l':'시장 성장률 (YoY)'},{v:'+5.2%','l':'주요 기업 주가 평균'},{v:'+1.1%','l':'원자재 가격 변동'}].map(i=> (
            <div key={i.l} className="tw-card text-center">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{i.v}</div>
              <div className="text-zinc-400">{i.l}</div>
            </div>
          ))}
        </section>
        <section className="grid md:grid-cols-3 gap-4">
          {["매출 추이","점유율","변동성 히트맵"].map(t=> (
            <div key={t} className="tw-card">
              <div className="font-semibold mb-2">{t}</div>
              <div className="h-48 border border-yellow-500/40 rounded-lg grid place-items-center text-yellow-300">차트</div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}



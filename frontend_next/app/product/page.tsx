import Layout from '../components/Layout'

export default function ProductPage(){
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="text-center mt-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">데이터에서 결론까지, 한 번에</h1>
          <p className="text-zinc-300 mt-3">뉴스·정량 데이터·AI 분석을 결합해, 객관적이고 구조화된 투자 인사이트를 제공합니다.</p>
          <div className="mt-5 flex gap-3 justify-center">
            <a href="/sample-report" className="tw-btn border border-yellow-400 text-yellow-400">샘플 리포트 보기</a>
            <a href="/signup" className="tw-btn tw-btn-primary">무료로 시작하기</a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center mb-8">핵심 기능</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[['🤖','AI 대화형 분석','자연스러운 대화로 생각의 깊이를 확장'],['📊','구조화 리포트 자동 생성','뉴스·데이터·시각화를 결합'],['📈','다각도 시각화','변화를 한눈에 파악']].map(([icon,title,desc])=> (
              <div key={title} className="tw-card text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-3 grid place-items-center text-black text-xl">{icon}</div>
                <div className="font-semibold mb-1">{title}</div>
                <div className="text-zinc-300 text-sm">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center mb-6">사용 시나리오</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {['뉴스 검색 또는 질문 입력','AI 분석 및 요약 확인','리포트 다운로드 및 공유'].map((t,i)=> (
              <div key={t} className="tw-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black grid place-items-center font-bold">{i+1}</div>
                <div className="text-zinc-200">{t}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}



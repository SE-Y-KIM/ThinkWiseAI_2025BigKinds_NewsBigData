import Layout from '../components/Layout'

export default function CommunityPage(){
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">커뮤니티</h1>
          <p className="text-zinc-300 mt-2">분석 리포트를 공유하고 다양한 시각을 만나보세요.</p>
        </section>
        <section className="grid md:grid-cols-2 gap-4">
          {[{t:'테슬라 주가, AI 시장 확대에 따라 어떻게?', c:'AI 투자 계획과 주가 변동 추세 분석', p:56},
            {t:'한국 금리 인상, 시장 영향은?', c:'금리 정책과 코스피 상관 분석', p:34},
            {t:'반도체 시장 전망', c:'AI 서버 수요와 기업 대응', p:42},
            {t:'환율 변동과 수출입', c:'달러 강세와 원화 약세 영향', p:28}].map(d=> (
            <div key={d.t} className="tw-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{d.t}</div>
                  <div className="text-zinc-400">{d.c}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-zinc-400 text-sm">
                <span>참여자 수: {d.p}명</span>
                <button className="tw-btn tw-btn-primary">토론 참여</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}



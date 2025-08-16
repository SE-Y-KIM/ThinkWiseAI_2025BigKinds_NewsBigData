import Layout from '../components/Layout'

export default function PricingPage(){
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="text-center mt-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">가격 정책</h1>
          <p className="text-zinc-300 mt-2">무료 체험부터 전문가용 플랜까지 합리적으로 제공합니다.</p>
        </section>
        <section className="grid md:grid-cols-3 gap-4">
          {[{
            name:'Free', price:'₩0 / 월', features:['월 5회 AI 분석','기본 뉴스 검색','거시지표 확인']
          },{
            name:'Pro', price:'₩19,900 / 월', features:['무제한 AI 분석','통합 검색','리포트 저장·공유','프리미엄 토론']
          },{
            name:'Enterprise', price:'맞춤형 견적', features:['팀 계정','API 연동','보안/전용 옵션']
          }].map(plan=> (
            <div key={plan.name} className="tw-card text-center">
              <div className="text-xl font-bold mb-2">{plan.name}</div>
              <div className="text-2xl text-yellow-300 font-extrabold mb-4">{plan.price}</div>
              <ul className="text-zinc-300 space-y-1 mb-4">
                {plan.features.map(f=> <li key={f}>✓ {f}</li>)}
              </ul>
              <button className="tw-btn tw-btn-primary">시작하기</button>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}



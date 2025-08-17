import Layout from '../../components/Layout'

export default function TermsPage(){
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">이용약관</h1>
          <p className="text-zinc-400 mt-2">서비스 이용과 관련된 조건과 규정</p>
        </div>

        <section className="tw-card space-y-4">
          <div>
            <h2 className="font-semibold text-yellow-300">서비스 이용 목적</h2>
            <p className="text-zinc-300">뉴스·데이터 분석 및 커뮤니티 기능을 제공하여 객관적 인사이트를 돕습니다.</p>
          </div>
          <div>
            <h2 className="font-semibold text-yellow-300">유료 서비스 및 결제</h2>
            <p className="text-zinc-300">결제 정책과 환불 조건을 명시하며, 결제 후 7일 이내 전액 환불이 가능합니다.</p>
          </div>
        </section>

        <div className="tw-card text-sm text-zinc-400">마지막 업데이트: 2024-08-15</div>
      </div>
    </Layout>
  )
}



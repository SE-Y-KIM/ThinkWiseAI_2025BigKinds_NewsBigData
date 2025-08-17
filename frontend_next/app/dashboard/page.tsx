import Layout from '../components/Layout'

export default function DashboardPage(){
  return (
    <Layout>
      <section className="text-center py-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">대시보드</h1>
        <p className="text-zinc-300 mt-2">핵심 지표와 트렌드를 한눈에</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="tw-card">KPI 카드</div>
        <div className="tw-card">트렌드 차트</div>
        <div className="tw-card">섹터 퍼포먼스</div>
        <div className="tw-card">뉴스 하이라이트</div>
      </div>
    </Layout>
  )
}



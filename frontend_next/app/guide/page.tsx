import Layout from '../components/Layout'
import Link from 'next/link'
import GuideDemo from '../components/GuideDemo'

export default function GuidePage(){
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">투자 분석 대화 가이드</h1>
          <p className="text-zinc-300 mt-2">ThinkWise AI의 핵심 기능을 빠르게 익히고 최대한 활용해 보세요.</p>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          {[{
            title:'1. 질문하기',
            desc:'뉴스/티커/키워드를 입력하면 관련 데이터와 근거를 바탕으로 답변합니다.',
            ex:'예: 삼성전자와 SK하이닉스 실적 비교'
          },{
            title:'2. 후속 질문',
            desc:'추가 질문으로 분석 범위를 좁히거나 확대할 수 있습니다.',
            ex:'예: 2024년 2분기 메모리 ASP 전망은?'
          },{
            title:'3. 리포트로 저장',
            desc:'대화 결과를 리포트로 저장하고 히스토리에서 다시 확인합니다.',
            ex:'PDF/공유 링크 제공'
          }].map(s => (
            <div key={s.title} className="tw-card">
              <div className="text-lg font-semibold mb-1">{s.title}</div>
              <p className="text-zinc-300 mb-2">{s.desc}</p>
              <div className="text-zinc-400 text-sm">{s.ex}</div>
            </div>
          ))}
        </section>

        <section className="tw-card">
          <h2 className="text-xl font-bold mb-3">대화 예시</h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-300">
            <li>“AI 반도체 관련 최근 뉴스 핵심 요약해줘”</li>
            <li>“긍정/부정 요인으로 나눠 정리하고 근거 기사 링크 포함해줘”</li>
            <li>“삼성전자에 미치는 영향만 추려서 3줄 요약해줘”</li>
          </ol>
        </section>

        <section className="tw-card">
          <h2 className="text-xl font-bold mb-3">무엇을 얻을 수 있나요?</h2>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>뉴스/데이터 기반 근거가 담긴 요약과 인사이트</li>
            <li>차트와 지표를 포함한 시각적 힌트</li>
            <li>PDF/링크 공유 가능한 구조화 리포트</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">인터랙티브 데모</h2>
          <GuideDemo />
        </section>

        <div className="text-center">
          <Link href="/" className="tw-btn tw-btn-primary">지금 대화 시작하기</Link>
        </div>
      </div>
    </Layout>
  )
}



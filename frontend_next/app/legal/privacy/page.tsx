import Layout from '../../components/Layout'

export default function PrivacyPage(){
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">개인정보처리방침</h1>
          <p className="text-zinc-400 mt-2">ThinkWise AI 서비스 이용 시 수집·이용되는 개인정보 안내</p>
        </div>

        <section className="tw-card">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">수집하는 개인정보 항목</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-zinc-300">
            <div className="tw-card"><div className="font-semibold mb-1 text-yellow-300">필수 정보</div>이름, 이메일, 비밀번호, 결제 정보</div>
            <div className="tw-card"><div className="font-semibold mb-1 text-yellow-300">선택 정보</div>프로필 이미지, 관심 키워드</div>
          </div>
        </section>

        <section className="tw-card">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">개인정보 수집 및 이용 목적</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-1">
            <li>회원 가입 및 본인 확인</li>
            <li>서비스 제공 및 리포트 생성</li>
            <li>결제 처리 및 고객 지원</li>
            <li>맞춤형 콘텐츠 및 분석 제안 제공</li>
          </ul>
        </section>

        <div className="tw-card text-sm text-zinc-400">마지막 업데이트: 2024-08-15</div>
      </div>
    </Layout>
  )
}



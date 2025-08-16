import Layout from '../components/Layout'

export default function LoginPage(){
  return (
    <Layout>
      <div className="max-w-md mx-auto tw-card">
        <h2 className="text-xl font-bold mb-4">ThinkWise AI 로그인</h2>
        <form className="grid gap-3">
          <label className="text-sm">이메일</label>
          <input className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="이메일을 입력하세요" />
          <label className="text-sm mt-2">비밀번호</label>
          <input type="password" className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2" placeholder="비밀번호를 입력하세요" />
          <button className="tw-btn tw-btn-primary mt-2">로그인</button>
        </form>
      </div>
    </Layout>
  )
}



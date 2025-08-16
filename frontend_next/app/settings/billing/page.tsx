"use client"
import { useState } from 'react'
import Layout from '../../components/Layout'

export default function BillingPage(){
  const [status,setStatus]=useState<string>("")
  const payments = [
    { date: '2024-08-01', amount: '₩19,900', status: 'completed' },
    { date: '2024-07-01', amount: '₩19,900', status: 'completed' },
  ]
  const onChangePayment = () => {
    setStatus('결제 수단 변경 페이지로 이동합니다...')
    setTimeout(()=> setStatus(''), 2000)
  }
  const onDownload = (date:string) => {
    setStatus(`${date} 영수증이 PDF로 저장되었습니다.`)
    setTimeout(()=> setStatus(''), 2000)
  }
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">설정 – 결제 및 영수증</h1>
          <p className="text-zinc-400 mt-2">결제 내역을 확인하고, 영수증을 다운로드하세요.</p>
        </div>

        {status && (
          <div className="tw-card text-center text-yellow-300">{status}</div>
        )}

        <section className="tw-card">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">결제 요약 정보</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-zinc-400 text-sm">현재 플랜</div>
              <div className="text-yellow-300 font-semibold">Pro Plan</div>
            </div>
            <div>
              <div className="text-zinc-400 text-sm">월 요금</div>
              <div className="text-green-400 font-bold text-lg">₩19,900</div>
            </div>
            <div>
              <div className="text-zinc-400 text-sm">결제 수단</div>
              <div className="text-zinc-200">VISA •••• 1234</div>
            </div>
            <div>
              <div className="text-zinc-400 text-sm">다음 결제일</div>
              <div className="text-orange-400">2024-09-01</div>
            </div>
          </div>
          <button onClick={onChangePayment} className="tw-btn tw-btn-primary mt-4">결제 수단 변경</button>
        </section>

        <section className="tw-card">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">결제 내역</h2>
          <div className="space-y-3">
            {payments.map(p => (
              <div key={p.date} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
                <div>
                  <div className="text-zinc-400 text-sm">결제일: {p.date}</div>
                  <div className="font-semibold">{p.amount}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tw-chip border-green-500 text-green-400">결제 완료</span>
                  <button onClick={()=>onDownload(p.date)} className="tw-btn bg-yellow-400 text-black">영수증 다운로드</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="tw-card">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">결제 수단 변경 안내</h3>
            <p className="text-zinc-300">신용카드, 계좌이체, 페이팔 지원. 변경 시 다음 결제일부터 적용됩니다.</p>
          </div>
          <div className="tw-card">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">환불 안내</h3>
            <p className="text-zinc-300">결제 후 7일 이내 전액 환불 가능. 환불 신청은 고객센터를 통해 처리됩니다.</p>
          </div>
        </section>
      </div>
    </Layout>
  )
}



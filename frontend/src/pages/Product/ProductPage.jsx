import React from 'react'

export default function ProductPage(){
  return (
    <div style={{ maxWidth:960, margin:'24px auto', padding:'0 16px' }}>
      <section style={{ textAlign:'center', marginTop:8 }}>
        <h1 style={{ fontSize:36, fontWeight:800, background:'linear-gradient(90deg,#FDE047,#F59E0B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>데이터에서 결론까지, 한 번에</h1>
        <p style={{ color:'#D4D4D4', marginTop:8 }}>뉴스·정량 데이터·AI 분석을 결합해, 객관적이고 구조화된 투자 인사이트를 제공합니다.</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:16 }}>
          <a href="/sample-report" className="tw-btn tw-btn--ghost">샘플 리포트 보기</a>
          <a href="/signup" className="tw-btn tw-btn--primary">무료로 시작하기</a>
        </div>
      </section>

      <section style={{ marginTop:32 }}>
        <h2 style={{ fontSize:24, fontWeight:700, textAlign:'center', marginBottom:16 }}>핵심 기능</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[['🤖','AI 대화형 분석','자연스러운 대화로 생각의 깊이를 확장'],['📊','구조화 리포트 자동 생성','뉴스·데이터·시각화를 결합'],['📈','다각도 시각화','변화를 한눈에 파악']].map(([icon,title,desc])=> (
            <div key={title} className="tw-card" style={{ textAlign:'center' }}>
              <div style={{ width:48, height:48, borderRadius:9999, background:'linear-gradient(90deg,#FDE047,#F59E0B)', display:'grid', placeItems:'center', margin:'0 auto 8px', color:'#111', fontWeight:700 }}>{icon}</div>
              <div style={{ fontWeight:600, marginBottom:4 }}>{title}</div>
              <div style={{ color:'#D4D4D4', fontSize:14 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop:28 }}>
        <h2 style={{ fontSize:24, fontWeight:700, textAlign:'center', marginBottom:12 }}>빠른 사용 가이드</h2>
        <ol style={{ maxWidth:720, margin:'0 auto', color:'#D4D4D4', lineHeight:1.7 }}>
          <li>메인에서 질문 입력 후 Enter 또는 전송 클릭</li>
          <li>결과 카드에서 요약/핵심 키워드/뉴스 하이라이트 확인</li>
          <li>대시보드에서 거시 지표·섹터 추이와 함께 비교</li>
          <li>리포트 생성에서 PDF로 저장하거나 공유</li>
        </ol>
      </section>
    </div>
  )
}



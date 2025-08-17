import React from 'react'
import AppLayout from '../../components/layout/AppLayout'

const PlanCard = ({ name, price, features, featured }) => (
  <div className="tw-card" style={{ border:`${featured? '2px':'1px'} solid ${featured? '#FFD700':'#3A3A3A'}`, textAlign:'center', transform: featured? 'scale(1.03)':'none' }}>
    <h3 style={{ color:'#fff', marginTop:0 }}>{name}</h3>
    <div style={{ color:'#FFD700', fontWeight:800, fontSize:28 }}>{price}</div>
    <ul style={{ color:'#E0E0E0', listStyle:'none', padding:0, marginTop:12 }}>
      {features.map((f,i)=> <li key={i} style={{ marginBottom:6 }}>{f}</li>)}
    </ul>
    <button className="tw-btn tw-btn--primary" style={{ marginTop:12 }}>선택</button>
  </div>
)

const PricingPage = () => (
  <AppLayout>
    <div>
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <h1 style={{ margin:0, background:'linear-gradient(135deg,#FFD700,#FF8C00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>당신의 투자 스타일에 맞는 요금제</h1>
        <div style={{ color:'#E0E0E0' }}>무료 체험부터 전문가용 플랜까지, ThinkWise AI의 모든 기능을 합리적으로 제공합니다.</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
        <PlanCard name="Free Plan" price="₩0 / 월" features={[ '월 5회 AI 분석', '기본 뉴스 검색', '실시간 거시 지표' ]} />
        <PlanCard name="Pro Plan" price="₩19,900 / 월" features={[ '무제한 AI 분석', '전체 뉴스·데이터 통합 검색', '리포트 저장·공유', '프리미엄 토론' ]} featured />
        <PlanCard name="Enterprise" price="맞춤형 견적" features={[ '팀 단위 계정 관리', 'API 연동/커스터마이징', '보안/전용 서버' ]} />
      </div>
    </div>
  </AppLayout>
)

export default PricingPage



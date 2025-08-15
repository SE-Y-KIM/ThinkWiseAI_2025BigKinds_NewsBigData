import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI 기반 분석',
      description: '최신 머신러닝 알고리즘으로 데이터를 정확하고 빠르게 분석합니다.',
      benefits: ['정확도 95% 이상', '실시간 처리', '자동 패턴 인식']
    },
    {
      icon: '📊',
      title: '직관적인 시각화',
      description: '복잡한 데이터를 이해하기 쉬운 차트와 그래프로 변환합니다.',
      benefits: ['인터랙티브 차트', '다양한 차트 유형', '반응형 디자인']
    },
    {
      icon: '⚡',
      title: '빠른 리포트 생성',
      description: '5분 만에 전문적인 비즈니스 리포트를 자동으로 생성합니다.',
      benefits: ['템플릿 기반 생성', '맞춤형 스타일링', 'PDF/PPT 내보내기']
    },
    {
      icon: '🔒',
      title: '보안 및 개인정보 보호',
      description: '엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다.',
      benefits: ['SSL 암호화', 'GDPR 준수', '정기 보안 감사']
    }
  ];

  return (
    <section className="value-proposition">
      <div className="container">
        <div className="value-proposition__header">
          <h2 className="value-proposition__title">
            왜 ThinkiWise를 선택해야 할까요?
          </h2>
          <p className="value-proposition__subtitle">
            데이터 분석의 복잡함을 단순화하고, 비즈니스 성과를 극대화하는 
            AI 기반 솔루션을 경험해보세요.
          </p>
        </div>

        <div className="value-proposition__features">
          {features.map((feature, index) => (
            <div key={index} className="value-proposition__feature">
              <div className="value-proposition__feature-icon">
                {feature.icon}
              </div>
              <div className="value-proposition__feature-content">
                <h3 className="value-proposition__feature-title">
                  {feature.title}
                </h3>
                <p className="value-proposition__feature-description">
                  {feature.description}
                </p>
                <ul className="value-proposition__feature-benefits">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="value-proposition__feature-benefit">
                      <span className="value-proposition__benefit-icon">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;


import React from 'react';
import './SocialProof.css';

const SocialProof = () => {
  const testimonials = [
    {
      name: '김민수',
      position: '마케팅 디렉터',
      company: '테크스타트업 A',
      content: 'ThinkiWise 덕분에 복잡한 데이터 분석을 팀원들이 쉽게 이해할 수 있게 되었습니다. 리포트 생성 시간이 80% 단축되었어요!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: '이지영',
      position: '데이터 분석가',
      company: '대기업 B',
      content: 'AI 기반 분석의 정확도가 정말 놀랍습니다. 기존에 수작업으로 하던 분석을 자동화하여 더 중요한 인사이트 발견에 집중할 수 있게 되었습니다.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: '박준호',
      position: 'CEO',
      company: '스타트업 C',
      content: '비즈니스 의사결정이 훨씬 데이터 기반으로 이루어지고 있습니다. ThinkiWise의 시각화 기능이 정말 직관적이고 유용합니다.',
      rating: 5,
      avatar: '👨‍💼'
    }
  ];

  const stats = [
    { number: '10,000+', label: '활성 사용자' },
    { number: '95%', label: '고객 만족도' },
    { number: '80%', label: '분석 시간 단축' },
    { number: '500+', label: '기업 고객' }
  ];

  return (
    <section className="social-proof">
      <div className="container">
        <div className="social-proof__header">
          <h2 className="social-proof__title">
            고객들이 말하는 ThinkiWise
          </h2>
          <p className="social-proof__subtitle">
            다양한 업계의 고객들이 ThinkiWise로 비즈니스 성과를 극대화하고 있습니다.
          </p>
        </div>

        <div className="social-proof__stats">
          {stats.map((stat, index) => (
            <div key={index} className="social-proof__stat">
              <div className="social-proof__stat-number">{stat.number}</div>
              <div className="social-proof__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="social-proof__testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="social-proof__testimonial">
              <div className="social-proof__testimonial-content">
                <div className="social-proof__testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="social-proof__star">⭐</span>
                  ))}
                </div>
                <p className="social-proof__testimonial-text">
                  "{testimonial.content}"
                </p>
                <div className="social-proof__testimonial-author">
                  <div className="social-proof__testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="social-proof__testimonial-info">
                    <div className="social-proof__testimonial-name">
                      {testimonial.name}
                    </div>
                    <div className="social-proof__testimonial-position">
                      {testimonial.position}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;


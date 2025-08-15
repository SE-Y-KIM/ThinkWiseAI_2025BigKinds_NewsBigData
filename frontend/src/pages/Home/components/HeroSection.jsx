import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-section__content">
          <div className="hero-section__text">
            <h1 className="hero-section__title">
              AI 기반 비즈니스 인사이트로
              <span className="hero-section__title-highlight"> 스마트한 의사결정</span>을
            </h1>
            
            <p className="hero-section__subtitle">
              ThinkiWise는 최신 AI 기술을 활용하여 복잡한 비즈니스 데이터를 
              명확하고 실용적인 인사이트로 변환합니다. 
              데이터 기반 의사결정으로 비즈니스 성과를 극대화하세요.
            </p>
            
            <div className="hero-section__actions">
              <Link to="/signup">
                <Button variant="primary" size="large">
                  무료로 시작하기
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="large">
                  데모 보기
                </Button>
              </Link>
            </div>
            
            <div className="hero-section__features">
              <div className="hero-section__feature">
                <span className="hero-section__feature-icon">🚀</span>
                <span>5분 만에 리포트 생성</span>
              </div>
              <div className="hero-section__feature">
                <span className="hero-section__feature-icon">🎯</span>
                <span>AI 기반 정확한 분석</span>
              </div>
              <div className="hero-section__feature">
                <span className="hero-section__feature-icon">📊</span>
                <span>직관적인 시각화</span>
              </div>
            </div>
          </div>
          
          <div className="hero-section__visual">
            <div className="hero-section__image-container">
              <div className="hero-section__dashboard-mockup">
                <div className="hero-section__mockup-header">
                  <div className="hero-section__mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="hero-section__mockup-content">
                  <div className="hero-section__mockup-chart hero-section__mockup-chart--1"></div>
                  <div className="hero-section__mockup-chart hero-section__mockup-chart--2"></div>
                  <div className="hero-section__mockup-chart hero-section__mockup-chart--3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


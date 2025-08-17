import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import './FooterSection.css';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: '기능', href: '/features' },
      { name: '가격', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: '통합', href: '/integrations' }
    ],
    company: [
      { name: '회사 소개', href: '/about' },
      { name: '채용', href: '/careers' },
      { name: '뉴스', href: '/news' },
      { name: '연락처', href: '/contact' }
    ],
    resources: [
      { name: '도움말', href: '/help' },
      { name: '문서', href: '/docs' },
      { name: '블로그', href: '/blog' },
      { name: '커뮤니티', href: '/community' }
    ],
    legal: [
      { name: '개인정보처리방침', href: '/privacy' },
      { name: '이용약관', href: '/terms' },
      { name: '쿠키 정책', href: '/cookies' },
      { name: '보안', href: '/security' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-text">ThinkiWise</span>
              </div>
              <p className="footer__tagline">
                AI 기반 비즈니스 인사이트로 스마트한 의사결정을
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="Twitter">
                  🐦
                </a>
                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                  💼
                </a>
                <a href="#" className="footer__social-link" aria-label="GitHub">
                  📚
                </a>
              </div>
            </div>

            <div className="footer__links">
              <div className="footer__link-group">
                <h3 className="footer__link-title">제품</h3>
                <ul className="footer__link-list">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__link-group">
                <h3 className="footer__link-title">회사</h3>
                <ul className="footer__link-list">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__link-group">
                <h3 className="footer__link-title">리소스</h3>
                <ul className="footer__link-list">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__link-group">
                <h3 className="footer__link-title">법적 고지</h3>
                <ul className="footer__link-list">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="footer__link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__newsletter">
            <h3 className="footer__newsletter-title">
              최신 소식을 받아보세요
            </h3>
            <p className="footer__newsletter-subtitle">
              새로운 기능과 업데이트 소식을 이메일로 받아보세요.
            </p>
            <div className="footer__newsletter-form">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="footer__newsletter-input"
              />
              <Button variant="primary" size="medium">
                구독하기
              </Button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © {currentYear} ThinkiWise. 모든 권리 보유.
          </div>
          <div className="footer__language">
            <select className="footer__language-select">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;


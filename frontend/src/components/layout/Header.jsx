import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLoggedIn = !!user;

  const navigationItems = isLoggedIn ? [
    { path: '/dashboard', label: '대시보드' },
    { path: '/chat', label: 'AI 채팅' },
    { path: '/report/step1', label: '리포트 생성' },
    { path: '/settings', label: '설정' }
  ] : [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <Link to="/" className="header__logo" onClick={closeMobileMenu}>
            <span className="header__logo-text">ThinkiWise</span>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {navigationItems.map((item) => (
                  <li key={item.path} className="header__nav-item">
                    <Link
                      to={item.path}
                      className={`header__nav-link ${
                        location.pathname === item.path ? 'header__nav-link--active' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* User Actions */}
          <div className="header__actions">
            {isLoggedIn ? (
              <div className="header__user-menu">
                <div className="header__user-info">
                  <span className="header__user-name">{user.name}</span>
                  <span className="header__user-plan">{user.plan}</span>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={onLogout}
                  className="header__logout-btn"
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="header__auth-buttons">
                <Link to="/login">
                  <Button variant="ghost" size="medium">
                    로그인
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="medium">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {isLoggedIn && (
              <button
                className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="메뉴 토글"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && isMobileMenuOpen && (
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className="header__mobile-nav-item">
                  <Link
                    to={item.path}
                    className={`header__mobile-nav-link ${
                      location.pathname === item.path ? 'header__mobile-nav-link--active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="header__mobile-nav-item">
                <button
                  className="header__mobile-nav-link header__mobile-nav-link--logout"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;


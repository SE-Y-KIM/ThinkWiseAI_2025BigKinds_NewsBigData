import React from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'

const HeaderBar = () => {
  const navigate = useNavigate()
  return (
    <header className="tw-header">
      <div className="tw-header__container">
        <Link to="/" className="tw-header__logo">ThinkWise</Link>
        <nav className="tw-header__center">
          <Link to="/" className="tw-header__link">제품</Link>
          <Link to="/pricing" className="tw-header__link">가격</Link>
          <Link to="/community" className="tw-header__link">커뮤니티</Link>
        </nav>
        <div className="tw-header__right">
          <button onClick={()=>navigate('/login')} className="tw-btn tw-btn--ghost">로그인</button>
          <button onClick={()=>navigate('/signup')} className="tw-btn tw-btn--primary">무료로 시작</button>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar



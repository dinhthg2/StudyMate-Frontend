import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ isLoggedIn, userAvatar }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isLoggedIn) {
      // Rule 2: Logo dẫn tới trang cá nhân
      navigate('/profile');
    } else {
      // Rule 1: Logo không dẫn đâu, hoặc về trang chủ
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="StudyMate Logo" />
      </div>
      <nav className="nav-menu">
        <Link to="/" className="nav-item">Trang chủ</Link>
        <Link to="/" className="nav-item">Khóa học</Link>
        {!isLoggedIn && (
          <>
            <Link to="/auth" className="nav-item">Bắt đầu</Link>
            <Link to="/auth" className="nav-item">Tài khoản</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/" className="nav-item">Khóa học</Link>
            <Link to="/" className="nav-item">Bắt đầu</Link>
            <Link to="/profile" className="nav-item">
              <img src={userAvatar} alt="User Avatar" className="user-avatar" />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ isLoggedIn, userAvatar, onLogoClick, onHomeClick, onLogout }) {
  return (
    <header className="header">
      <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="StudyMate Logo" />
      </div>

      <nav className="nav-menu">
        {!isLoggedIn ? (
          <Link to="/" className="nav-item active">Trang chủ</Link>
        ) : (
          <span className="nav-item active" onClick={onHomeClick} style={{ cursor: 'default' }}>Trang chủ</span>
        )}

        <a href="#" className="nav-item">Khóa học</a>
        {!isLoggedIn ? (
          <Link to="/auth" className="nav-item">Bắt đầu</Link>
        ) : (
          <span className="nav-item">Bắt đầu</span>
        )}

        {!isLoggedIn ? (
          <Link to="/auth" className="nav-item">Tài khoản</Link>
        ) : (
          <div className="nav-item avatar-section">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="avatar"
              onClick={onLogoClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ onLogout }) {
  const navigate = useNavigate();

  // Thông tin giả lập, bạn có thể lấy từ backend qua API
  const user = {
    fullName: 'Nguyễn Văn A',
    emailOrPhone: 'user@example.com',
    role: 'Student',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thông tin cá nhân</h2>
      <p><b>Họ và tên:</b> {user.fullName}</p>
      <p><b>Email/SĐT:</b> {user.emailOrPhone}</p>
      <p><b>Vai trò:</b> {user.role}</p>

      <button onClick={() => {
        onLogout();
        navigate('/');
      }}>
        Đăng xuất
      </button>
    </div>
  );
}

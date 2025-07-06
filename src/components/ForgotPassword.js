import React, { useState } from 'react';
import api from '../services/api';

// Map role string UI sang giá trị enum backend (phải giống AuthForm.js)
const ROLE_ENUM = {
  'Admin': 0,
  'Học sinh': 1,
  'Gia sư': 2,
};

export default function ForgotPassword({ onSwitchToAuth }) {
  const [role, setRole] = useState('Gia sư');
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      await api.forgotPassword({
        emailOrPhone: formData.emailOrPhone,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
        role: ROLE_ENUM[role],
      });
      setSuccess('Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.');
    } catch (err) {
      let message = 'Có lỗi xảy ra';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') message = err.response.data;
        else if (typeof err.response.data.message === 'string') message = err.response.data.message;
        else if (typeof err.response.data.title === 'string') message = err.response.data.title;
      } else if (typeof err.message === 'string') message = err.message;
      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Quên mật khẩu?</h2>

      <div className="role-tabs">
        <button
          className={role === 'Gia sư' ? 'tab active' : 'tab'}
          onClick={() => setRole('Gia sư')}
          type="button"
        >
          Gia sư
        </button>
        <button
          className={role === 'Học sinh' ? 'tab active' : 'tab'}
          onClick={() => setRole('Học sinh')}
          type="button"
        >
          Học sinh
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email/SĐT:"
          value={formData.emailOrPhone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới:"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu:"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-submit">Đặt lại mật khẩu</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <hr />

      <p className="switch-text">
        Bạn chưa có tài khoản? <span className="switch-link" onClick={onSwitchToAuth}>Đăng ký!</span>
      </p>
    </div>
  );
}

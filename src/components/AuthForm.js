
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AuthForm.css';

const ROLE_ENUM = {
  Admin: 0,
  'Học sinh': 1,
  'Gia sư': 2,
};

export default function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(true);
  const [role, setRole] = useState('Gia sư');
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      if (isRegister) {
        await api.register({
          fullName: formData.fullName,
          emailOrPhone: formData.emailOrPhone,
          password: formData.password,
          role: ROLE_ENUM[role],
          subjects: '',
          availableTime: '',
        });
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsRegister(false);
        setFormData({
          fullName: '',
          emailOrPhone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        const data = await api.login({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password,
          role: ROLE_ENUM[role],
        });

        localStorage.setItem('token', data.token);

        // Giải mã token lấy role nếu cần
        const decoded = jwtDecode(data.token);
        const userRole =
          decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decoded.role;

        

        if (onLogin) onLogin();

        // Điều hướng theo role nếu muốn (không cần trong rule hiện tại)
        navigate('/');
      }
    } catch (err) {
      let message = 'Có lỗi xảy ra';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          message = err.response.data;
        } else if (typeof err.response.data.message === 'string') {
          message = err.response.data.message;
        } else if (typeof err.response.data.title === 'string') {
          message = err.response.data.title;
        }
      } else if (typeof err.message === 'string') {
        message = err.message;
      }
      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</h2>
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
        {isRegister && (
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên:"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        )}

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
          name="password"
          placeholder="Mật khẩu:"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu:"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        {!isRegister && (
          <div className="auth-options">
            <label>
              <input type="checkbox" /> Ghi nhớ mật khẩu
            </label>
            <a href="#!" className="forgot-link">
              Quên mật khẩu?
            </a>
          </div>
        )}

        <button type="submit" className="btn-submit">
          {isRegister ? 'Đăng Ký' : 'Đăng nhập'}
        </button>
      </form>

      <hr />

      <button
        className="btn-google"
        type="button"
        onClick={() => alert('Chức năng Google Login chưa làm')}
      >
        <i className="fab fa-google"></i> Đăng nhập bằng Google
      </button>
      <button
        className="btn-facebook"
        type="button"
        onClick={() => alert('Chức năng Facebook Login chưa làm')}
      >
        <i className="fab fa-facebook-f"></i> Đăng nhập bằng Facebook
      </button>

      <hr />

      <p className="switch-text">
        {isRegister ? 'Bạn đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
        <span
          className="switch-link"
          onClick={() => setIsRegister(!isRegister)}
          role="button"
          tabIndex={0}
        >
          {isRegister ? 'Đăng nhập!' : 'Đăng ký!'}
        </span>
      </p>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>Nền tảng kết nối học tập</h3>
        <p>SDT: 1234567890</p>
        <p>Email: abctasady@email.com</p>
        <p>Địa chỉ: Quy Nhơn - Việt Nam</p>
      </div>

      <div className="footer-links">
        <div>
          <h3>Liên kết nhanh</h3>
          <a href="#">Trang chủ</a>
          <a href="#">Khóa học</a>
          <a href="#">Giới Thiệu</a>
          <a href="#">Blog</a>
        </div>

        <div>
          <h3>Hỗ trợ</h3>
          <a href="#">Trung tâm hỗ trợ</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản sử dụng</a>
          <a href="#">FAQ</a>
        </div>

        <div>
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i> Facebook</a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i> Instagram</a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

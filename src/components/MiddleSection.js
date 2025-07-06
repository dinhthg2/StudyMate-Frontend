import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MiddleSection.css';

export default function MiddleSection() {
  const navigate = useNavigate();

  return (
    <div className="middle-container">
      {/* Nội dung giới thiệu */}
      <div className="intro-section">
        <div className="intro-text">
          <div className="small-title">STUDYMATE</div>
          <h2>NỀN TẢNG KẾT NỐI MỌI NGƯỜI LẠI GẦN NHAU HƠN</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          {/* Nút "Bắt đầu" điều hướng sang trang đăng nhập/đăng ký */}
          {/* <button className="btn-yellow" onClick={() => navigate('/auth')}>
            Bắt đầu
          </button> */}
        </div>
        <div className="intro-images">
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
        </div>
      </div>

      {/* Phần feedback */}
      <div className="feedback-section">
        <h3>Feedback</h3>
        <div className="feedback-cards">
          <div className="feedback-card">
            <p><i>"Lorem ipsum dolor sit amet consectetur. Ac hac sociis arcu aenean mi. Et habitant ullamcorper..."</i></p>
            <b>Davil Dang...</b>
          </div>
          <div className="feedback-card">
            <p><i>"Lorem ipsum dolor sit amet consectetur. Ac hac sociis arcu aenean mi. Et habitant ullamcorper..."</i></p>
            <b>Davil Dang...</b>
          </div>
          <div className="feedback-card">
            <p><i>"Lorem ipsum dolor sit amet consectetur. Ac hac sociis arcu aenean mi. Et habitant ullamcorper..."</i></p>
            <b>Davil Dang...</b>
          </div>
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

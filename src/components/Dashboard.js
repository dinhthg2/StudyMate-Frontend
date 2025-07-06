import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackCard from './FeedbackCard';
import './Dashboard.css';
import api from '../services/api';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [matches, setMatches] = useState([]);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    api.getFeedbacks()
      .then(data => setFeedbacks(data))
      .catch(() => {
        setFeedbacks([
          { id: 1, text: 'Lorem ipsum dolor sit amet consectetur.', author: 'Davil Dang' },
          { id: 2, text: 'Ac hac sociis arcu aenean mi...', author: 'Davil Dang' },
          { id: 3, text: 'Phần feedback mẫu thứ ba...', author: 'Davil Dang' },
        ]);
      });

    if (token) {
      api.getMyMatches(token)
        .then(data => setMatches(data))
        .catch(err => console.error('Lấy danh sách match lỗi:', err));
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <section className="welcome-section">
        <h1>Chào Mừng Đến Với StudyMate</h1>
        <p>Nền tảng học kết nối học tập của bạn</p>
        <button className="btn-yellow" onClick={() => navigate('/auth')}>
          Bắt đầu
        </button>
      </section>

       <section className="match-list-section">
        <h2>Danh sách bạn học đã match</h2>
        <div className="match-list">
          {matches.length === 0 && <p>Bạn chưa có bạn học nào.</p>}
          {matches.map(user => (
            <div key={user.id} className="match-card">
              <h3>{user.fullName || user.username}</h3>
              <p><strong>Môn học:</strong> {user.subjects}</p>
              <p><strong>Thời gian rảnh:</strong> {user.availableTime}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="feedback-section">
        <h2>Feedback</h2>
        <div className="feedback-list">
          {feedbacks.map(fb => (
            <FeedbackCard key={fb.id} text={fb.text} author={fb.author} />
          ))}
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import './FeedbackCard.css';

export default function FeedbackCard({ text, author }) {
  return (
    <div className="feedback-card">
      <p>“{text}”</p>
      <strong>{author}</strong>
    </div>
  );
}

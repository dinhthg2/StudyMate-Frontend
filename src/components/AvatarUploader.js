import React, { useState } from 'react';
import api from '../services/api';

export default function AvatarUploader({ currentAvatar, onAvatarUpdated }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const result = await api.uploadAvatar(file, token);
      onAvatarUpdated(result.avatarUrl);
    } catch (err) {
      setError('Upload thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src={currentAvatar || '/default-avatar.png'}
        alt="Avatar"
        style={{ width: 100, height: 100, borderRadius: '50%' }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Đang tải...' : 'Tải lên'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

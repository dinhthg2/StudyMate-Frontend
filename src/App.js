import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MiddleSection from './components/MiddleSection';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import { getProfile } from './services/api';

function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      getProfile(token)
        .then(profile => {
          setUserAvatar(profile.avatarUrl);
        })
        .catch(() => {
          setUserAvatar('/default-avatar.png');
        });
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserAvatar('https://i.pravatar.cc/40');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserAvatar(null);
    navigate('/');
  };

  const handleHomeClick = () => {
    if (!isLoggedIn) {
      navigate('/');
    }
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userAvatar={userAvatar}
        onLogoClick={() => {
          if (isLoggedIn) navigate('/profile');
          else navigate('/');
        }}
        onHomeClick={handleHomeClick}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<MiddleSection />} />
        <Route path="/auth" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

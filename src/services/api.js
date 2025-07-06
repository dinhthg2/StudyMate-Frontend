import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5069/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeedbacks = () => api.get('/feedbacks').then(res => res.data);

export const getMyMatches = (token) =>
  api.get('/users/mymatches', { headers: { Authorization: `Bearer ${token}` } })
     .then(res => res.data);

export const register = async (data) => {
  try {
    const response = await api.post('/users/register', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng ký' };
  }
};

export const login = async (data) => {
  try {
    const response = await api.post('/users/login', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng nhập' };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await api.post('/users/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi quên mật khẩu' };
  }
};

export const getProfile = (token) => {
  return api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
};

export default {
  getFeedbacks,
  getMyMatches,
  register,
  login,
  forgotPassword,
  getProfile
};

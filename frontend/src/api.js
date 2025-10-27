
import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export function setToken(token) {
  API.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
}

export async function getUser() {
  const token = localStorage.getItem('tf_token');
  if (!token) return null;
  setToken(token);
  try {
    const res = await API.get('/auth/me'); // we'll create this route in backend
    return res.data;
  } catch {
    return null;
  }
}

export default API;

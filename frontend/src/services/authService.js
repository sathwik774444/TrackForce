import api from './axiosInstance';


export default {
    login: (email, password) => api.post('/auth/login', { email, password }),
    signup: (payload) => api.post('/auth/signup', payload),
    getProfile: () => api.get('/auth/profile'),
};
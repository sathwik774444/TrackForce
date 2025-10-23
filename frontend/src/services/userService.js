import api from './axiosInstance';


export default {
    getSolvedProblems: () => api.get('/users/solved'),
    getLeaderboard: () => api.get('/users/leaderboard'),
    updateProfile: (payload) => api.put('/users/profile', payload),
};
import api from './axiosInstance';


export default {
    getTopics: () => api.get('/problems/topics'), // returns [{ _id, name, description }]
    getProblemsByTopic: (topicId) => api.get(`/problems/topic/${topicId}`), // returns [{ id, name, url, difficulty }]
    markSolved: (problemId) => api.post('/problems/mark-solved', { problemId }),
};
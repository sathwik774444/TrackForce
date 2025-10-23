import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';


export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('tf_token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // try to fetch profile
            authService.getProfile().then(res => setUser(res.data)).catch(() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem('tf_token');
                delete axios.defaults.headers.common['Authorization'];
            });
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        const res = await authService.login(email, password);
        const t = res.data.token;
        localStorage.setItem('tf_token', t);
        setToken(t);
        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        const profile = await authService.getProfile();
        setUser(profile.data);
        setLoading(false);
        return profile;
    };

    const signup = async (payload) => {
        setLoading(true);
        const res = await authService.signup(payload);
        const t = res.data.token;
        localStorage.setItem('tf_token', t);
        setToken(t);
        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        const profile = await authService.getProfile();
        setUser(profile.data);
        setLoading(false);
        return profile;
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('tf_token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
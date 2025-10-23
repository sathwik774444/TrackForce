import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div className="auth-card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}
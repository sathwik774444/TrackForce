import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Signup() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };


    return (
        <div className="auth-card">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={username} onChange={e => setName(e.target.value)} required />
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button className="btn">Create account</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
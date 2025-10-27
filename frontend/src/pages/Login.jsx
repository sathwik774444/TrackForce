
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setToken } from '../api';

export default function Login({ setUser }) {   // receive setUser from App.jsx
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);

      if (res.data.token) {
        // store token
        localStorage.setItem('tf_token', res.data.token);
        setToken(res.data.token);

        // fetch user info
        const userRes = await API.get('/auth/me');
        setUser(userRes.data);   // update App.jsx user state

        alert('Logged in');
        navigate('/dashboard');  // redirect to dashboard
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h3>Login</h3>
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button>Login</button>
    </form>
  );
}

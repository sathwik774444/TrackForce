
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setToken } from '../api';

export default function Signup({ setUser }) {   // receive setUser from App.jsx
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);

      if (res.data.token) {
        // store token
        localStorage.setItem('tf_token', res.data.token);
        setToken(res.data.token);

        // fetch user info
        const userRes = await API.get('/auth/me');
        setUser(userRes.data);   // update App.jsx user state

        alert('Signed up and logged in');
        navigate('/dashboard');  // redirect to dashboard
      }
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h3>Signup</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <button>Signup</button>
    </form>
  );
}

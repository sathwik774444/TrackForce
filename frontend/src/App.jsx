
import React from 'react';
import { useEffect, useState } from 'react';
import API from './api';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddProblem from './pages/AddProblem';
import ProtectedRoute from './components/ProtectedRoute';
import Ranking from './pages/Ranking';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('tf_token');
    if (token) {
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user?.isAdmin && <Link to="/add-problem">Add Problem</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {!user && <Link to="/login">Login</Link>}
        <Link to="/ranking">Ranking</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:id" element={<Problems />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/add-problem" element={
            <ProtectedRoute>
              <AddProblem />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}


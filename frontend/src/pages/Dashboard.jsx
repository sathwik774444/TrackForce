import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <p>Solved Problems: {user.solved.length}</p>
      <ul>
        {user.solved.map(p => (
          <li key={p._id}>
            <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

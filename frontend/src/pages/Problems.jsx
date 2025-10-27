
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API, { setToken } from '../api';

export default function Problems() {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const [solvedIds, setSolvedIds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('tf_token');
    if (token) setToken(token);

    // fetch problems
    API.get(`/problems/topic/${id}`).then(res => setProblems(res.data)).catch(() => { });

    // fetch user solved problems
    API.get('/auth/me')
      .then(res => setSolvedIds(res.data.solved.map(p => p._id)))
      .catch(() => setSolvedIds([]));
  }, [id]);

  const toggle = async (pid) => {
    await API.post(`/problems/toggle-solve/${pid}`).catch(() => { });
    // update solvedIds locally
    setSolvedIds(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);
  };

  return (
    <div>
      <h2>Problems</h2>
      <ul className="list">
        {problems.map(p => {
          const isSolved = solvedIds.includes(p._id);
          return (
            <li key={p._id} className="card">
              <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a>
              <div>{p.difficulty} • {p.tags?.join(', ')}</div>
              <button onClick={() => toggle(p._id)}>
                {isSolved ? 'Solved ✅' : 'Mark as Solved'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

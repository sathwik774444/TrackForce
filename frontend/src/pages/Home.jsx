
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    API.get('/topics').then(r => setTopics(r.data)).catch(() => { });
  }, []);
  return (
    <div>
      <h1>Topics</h1>
      <ul className="grid">
        {topics.map(t => <li key={t._id}><Link to={`/topic/${t._id}`}>{t.name}</Link></li>)}
      </ul>
    </div>
  );
}

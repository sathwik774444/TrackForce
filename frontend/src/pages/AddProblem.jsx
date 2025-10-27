import React, { useState, useEffect } from 'react';
import API from '../api';

export default function AddProblem() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    title: '',
    codeforcesId: '',
    url: '',
    difficulty: '',
    tags: '',
    topic: ''
  });

  // fetch topics for dropdown
  useEffect(() => {
    API.get('/topics')
      .then(res => setTopics(res.data))
      .catch(() => setTopics([]));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/problems', {
        ...form,
        tags: form.tags.split(',').map(t => t.trim())
      });
      alert('Problem added!');
      setForm({ title: '', codeforcesId: '', url: '', difficulty: '', tags: '', topic: '' });
    } catch (err) {
      alert('Error adding problem. Make sure you are logged in as admin.');
    }
  };

  return (
    <div>
      <h2>Add Problem</h2>
      <form onSubmit={submit} className="auth">
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Codeforces ID" value={form.codeforcesId} onChange={e => setForm({ ...form, codeforcesId: e.target.value })} />
        <input placeholder="URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required />
        <input placeholder="Difficulty" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required>
          <option value="">Select Topic</option>
          {topics.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
        <button type="submit">Add Problem</button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import problemService from '../services/problemService';
import CategoryCard from '../components/CategoryCard';

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    problemService
      .getTopics()
      .then((res) => setTopics(res.data))
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Topics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {topics.map((t) => (
            <CategoryCard key={t._id} topic={t} />
          ))}
        </div>
      )}
    </div>
  );
}

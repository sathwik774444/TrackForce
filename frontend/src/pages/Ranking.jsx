import { useEffect, useState } from 'react';
import API from '../api'; // your Axios instance

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await API.get('/auth/ranking'); // backend route
        setRanking(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Ranking</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map(user => (
            <tr key={user._id}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.solvedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

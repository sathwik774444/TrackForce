import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import LeaderboardCard from '../components/LeaderboardCard';


export default function Leaderboard() {
    const [board, setBoard] = useState([]);
    useEffect(() => {
        userService.getLeaderboard().then(res => setBoard(res.data)).catch(() => setBoard([]));
    }, []);


    return (
        <div>
            <h2>Leaderboard</h2>
            <div className="leaderboard">
                {board.map((b, i) => <LeaderboardCard key={b._id || i} entry={b} rank={i + 1} />)}
            </div>
        </div>
    );
}
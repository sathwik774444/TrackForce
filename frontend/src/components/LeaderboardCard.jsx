import React from 'react';
export default function LeaderboardCard({ entry, rank }) {
    return (
        <div className="leaderboard-row">
            <div className="rank">{rank}</div>
            <div className="name">{entry.name}</div>
            <div className="score">{entry.solvedCount}</div>
        </div>
    );
}
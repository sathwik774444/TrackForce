import React from 'react';


export default function ProblemCard({ problem, onMarkSolved, solved }) {
    return (
        <div className={`problem-card ${solved ? 'solved' : ''}`}>
            <div className="p-left">
                <a href={problem.url} target="_blank" rel="noreferrer">{problem.name}</a>
                <div className="meta">Difficulty: {problem.difficulty}</div>
            </div>
            <div className="p-right">
                <button onClick={() => onMarkSolved(problem.id)} disabled={solved} className="btn-small">
                    {solved ? 'Solved' : 'Mark Solved'}
                </button>
            </div>
        </div>
    );
}
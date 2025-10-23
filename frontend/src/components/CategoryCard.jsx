import React from 'react';
import { Link } from 'react-router-dom';


export default function CategoryCard({ topic }) {
    return (
        <div className="category-card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <Link to={`/topic/${topic._id}`} className="btn-small">View Problems</Link>
        </div>
    );
}
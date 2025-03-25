import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>TrackForce</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
      </nav>
      <h1>Welcome to TrackForce</h1>
      <p>Organize and track Codeforces problems topic-wise to improve your coding skills.</p>
      <button className="start-btn"><Link to="/topics">View Topics</Link></button>
    </div>
  );
};

export default Home;

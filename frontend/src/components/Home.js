import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-container">
      <div className="content-wrapper">
        <h1 className="welcome-title">Welcome to TrackForce</h1>
        <p className="welcome-description">Organize and track Codeforces problems topic-wise to improve your coding skills.</p>
        <div className="cta-container">
          <button className="start-btn">
            <Link className="link-style" to="/topics">View Topics</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;

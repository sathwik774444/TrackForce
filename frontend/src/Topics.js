import React from "react";
import { Link } from "react-router-dom";
import "./Topics.css";

const topics = ["Arrays","Strings","Stacks and Queues","LinkedList", "Trees","Dynamic Programming","Graphs","Algorithms"];

const Topics = () => {
  return (
    <div className="topics-container">
      <h1>Select a Topic</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <Link to={`/problems/${topic.toLowerCase().replace(" ", "-")}`}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
      <button className="back-button"><Link className="link-style" to="/">Back to Home</Link></button>
    </div>
  );
};

export default Topics;

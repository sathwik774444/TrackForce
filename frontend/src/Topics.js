import React from "react";
import { Link } from "react-router-dom";
import "./Topics.css";

const topics = ["Arrays","Strigs","Stacks and Queues","LinkedList", "Trees","Dynamic Programming","Graphs","Algorithms"];

const Topics = () => {
  return (
    <div className="topics-container">
      <h1>Select a Topic</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <Link to={`/problems/${topic.toLowerCase().replace(" ", "-")}`}>
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;

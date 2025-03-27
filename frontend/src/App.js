import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Arrays from "./components/Arrays";
import Strings from "./components/Strings";
import LinkedList from "./components/LinkedList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/problems/arrays" element={<Arrays />} />
        <Route path="/problems/strings" element={<Strings />} />
        <Route path='/problems/linkedlist' element={<LinkedList />} /> 
      </Routes>
    </Router>
  );
}

export default App;

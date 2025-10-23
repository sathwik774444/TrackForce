import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Topics from "./Topics";
import Arrays from "./Arrays";
import Strings from "./Strings";
import LinkedList from "./LinkedList";

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

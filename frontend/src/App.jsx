// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import Topics from "./components/Topics";
// import Arrays from "./components/Arrays";
// import Strings from "./components/Strings";
// import LinkedList from "./components/LinkedList";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/topics" element={<Topics />} />
//         <Route path="/problems/arrays" element={<Arrays />} />
//         <Route path="/problems/strings" element={<Strings />} />
//         <Route path='/problems/linkedlist' element={<LinkedList />} /> 
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TopicProblems from './pages/TopicProblems';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import PrivateRoute from './routes/PrivateRoute';


export default function App() {
    return (
        <div className="app-root">
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />


                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/topic/:topicId" element={<PrivateRoute><TopicProblems /></PrivateRoute>} />
                    <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />


                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
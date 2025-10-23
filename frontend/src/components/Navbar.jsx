import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="brand">TrackForce</Link>
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <Link to="/leaderboard">Leaderboard</Link>
                        <Link to="/profile">{user.name || 'Profile'}</Link>
                        <button onClick={handleLogout} className="btn-link">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';


export default function PrivateRoute({ children }) {
    const { user, token } = useContext(AuthContext);
    const location = useLocation();


    if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}
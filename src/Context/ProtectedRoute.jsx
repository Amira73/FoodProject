import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { loginData, isAuthenticated } = useAuth();
  const token = localStorage.getItem('token'); 
   return token ? element : <Navigate to="/login" replace />;

  // const allowed = !!token && isAuthenticated && !!loginData;

  // return allowed ? element : <Navigate to="/login" />;  
};

export default ProtectedRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ children, loginPage = false }) {
  const { currentUser } = useAuth();
  if (loginPage) return currentUser ? <Navigate to='/' /> : children;
  else return currentUser ? children : <Navigate to='/login' />;
}

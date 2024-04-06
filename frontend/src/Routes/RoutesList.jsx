import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ChatPage from '../pages/ChatPage/ChatPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

const RoutesList = () => (
  <Routes>
    {/* prettier-ignore */}
    <Route
      path="/"
      element={<PrivateRoute><ChatPage /></PrivateRoute>}
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default RoutesList;

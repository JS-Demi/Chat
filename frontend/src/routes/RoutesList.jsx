import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Chat from '../pages/ChatPage/Chat.jsx';
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import SignupPage from '../pages/SignupPage/SignupPage.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

const RoutesList = () => (
  <Routes>
    {/* prettier-ignore */}
    <Route
      path="/"
      element={<PrivateRoute><Chat /></PrivateRoute>}
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default RoutesList;

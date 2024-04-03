import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import Chat from '../Pages/MainPage/Chat';
import SignupPage from '../Pages/SignupPage/SignupPage';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PrivateRoute = ({ children }) => {
  const access = useLocalStorage();

  return access ? children : <Navigate to="/login" />;
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

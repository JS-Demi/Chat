import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import Chat from '../pages/ChatPage/Chat.jsx';
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import SignupPage from '../pages/SignupPage/SignupPage.jsx';
import getRoutes from '../utilities/getRoutes.js';

// eslint-disable-next-line object-curly-newline
const { loginPage, signupPage, chatPage, other } = getRoutes();

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={loginPage} />;
};

const RoutesList = ({ socket }) => (
  <Routes>
    {/* prettier-ignore */}
    <Route
      path={chatPage}
      element={<PrivateRoute><Chat socket={socket} /></PrivateRoute>}
    />
    <Route path={loginPage} element={<LoginPage />} />
    <Route path={signupPage} element={<SignupPage />} />
    <Route path={other} element={<ErrorPage />} />
  </Routes>
);

export default RoutesList;

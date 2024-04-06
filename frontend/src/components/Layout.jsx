import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Layout = () => {
  // get access data
  const { logout, user } = useAuth();
  const isLoggedIn = !!user;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout('user');
    navigate('/login');
  };
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {t('header.chatName')}
          </Link>
          {isLoggedIn && (
            <Button onClick={handleLogout} variant="primary">
              {t('header.logout')}
            </Button>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;

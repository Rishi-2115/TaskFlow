import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TaskFlow</Link>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <span className="user-greeting">Hello, {currentUser.name}</span>
            <button onClick={handleLogout} className="btn btn-outline-light">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn btn-outline-light">Login</Link>
            <Link to="/register" className="btn btn-light">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../components-css/Navbar.css'; // Modern CSS import

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">Task Manager</div>
      <ul className="navbar-links">
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </header>
  );
}

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/api';
import '../components-css/ProtectedRoute.css'; // Modern CSS import


export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.post('/auth/profile')
      .then(() => setStatus('ok'))
      .catch(() => setStatus('no'));
  }, []);

  if (status === 'loading') {
    return (
      <div className="protected-loader">
        <div className="spinner"></div>
        <p className="loading-text">Checking Authentication...</p>
      </div>
    );
  }

  return status === 'ok' ? children : <Navigate to="/login" replace />;
}

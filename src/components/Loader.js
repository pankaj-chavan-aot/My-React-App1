import React from 'react';
//import './components-css/Loader.css'; 
//import '../components/Loader.css'; // Modern CSS import
import '../components-css/Loader.css'; // Modern CSS import

export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

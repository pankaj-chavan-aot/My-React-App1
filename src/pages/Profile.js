import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/api';
import '../pages-css/Profile.css'; // Modern CSS import

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.post('/auth/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.error('Profile error', err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Profile</h2>
        {profile ? (
          <div>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        ) : <p>Loading...</p>}
      </div>
    </div>
  );
}

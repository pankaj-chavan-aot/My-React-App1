import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
//import '../components/styles.css';
import '../pages-css/Signup.css'; // Modern CSS import

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault(); setErr('');
    try {
      await api.post('/auth/signup', { username, password });
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handle}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit">Signup</button>
      </form>
      {err && <p className="error">{err}</p>}
      <p style={{marginTop:12}}>Already registered? <span style={{color:'#4f46e5',cursor:'pointer'}} onClick={()=>navigate('/login')}>Login</span></p>
    </div>
  );
}

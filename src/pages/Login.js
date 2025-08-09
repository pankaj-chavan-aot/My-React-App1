// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// //import '../components/styles.css';
// import '../pages-css/Login.css'; // Modern CSS import


// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [err, setErr] = useState('');
//   const navigate = useNavigate();

//   const handle = async (e) => {
//     e.preventDefault(); setErr('');
//     try {
//       await api.post('/auth/login', { username, password });
//       navigate('/tasks');
//     } catch (error) {
//       console.error(error);
//       setErr(error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       <form onSubmit={handle}>
//         <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
//         <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required />
//         <button type="submit">Login</button>
//       </form>
//       {err && <p className="error">{err}</p>}
//       <p style={{marginTop:12}}>Don't have account? <span style={{color:'#4f46e5',cursor:'pointer'}} onClick={()=>navigate('/signup')}>Sign up</span></p>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../pages-css/Login.css'; // Modern CSS import

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(''); // ✅ Success message state
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      await api.post('/auth/login', { username, password });
      setSuccess('Login successful! 🎉'); // ✅ Set success message
      setTimeout(() => navigate('/tasks'), 1500); // 1.5s नंतर redirect
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handle}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Success message */}
      {success && <p className="success">{success}</p>}

      {/* ❌ Error message */}
      {err && <p className="error">{err}</p>}

      <p style={{marginTop:12}}>
        Don't have account?{' '}
        <span style={{color:'#4f46e5',cursor:'pointer'}} onClick={()=>navigate('/signup')}>
          Sign up
        </span>
      </p>
    </div>
  );
}

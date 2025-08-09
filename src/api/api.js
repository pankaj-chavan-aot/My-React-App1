import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://task-management-api-f496.onrender.com', 
  withCredentials: true, // ✅ cookies send करण्यासाठी
});

export default api;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import api from '../api/api';
// import '../components/styles.css';
import '../pages-css/Tasks.css'; // Modern CSS import

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks', err);
      if (err.response?.status === 401) {
        // optional: redirect to login
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Your Tasks</h2>
        <TaskForm onTaskAdded={fetchTasks} />
        {loading ? <div className="loader">Loading tasks...</div> : <TaskList tasks={tasks} />}
      </div>
    </div>
  );
}

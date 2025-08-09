import React, { useState } from 'react';
import api from '../api/api';
//import './styles.css';
import '../components-css/TaskForm.css'; // Modern CSS import
export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tasks', { title, description });
      setTitle(''); setDescription('');
      onTaskAdded?.();
    } catch (err) {
      console.error('Create task error', err);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" required />
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Task description" rows={3} required />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
    </form>
  );
}

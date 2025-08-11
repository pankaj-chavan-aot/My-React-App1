// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import TaskForm from '../components/TaskForm';
// import TaskList from '../components/TaskList';
// import api from '../api/api';
// // import '../components/styles.css';
// import '../pages-css/Tasks.css'; // Modern CSS import

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get('/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error('Error loading tasks', err);
//       if (err.response?.status === 401) {
//         // optional: redirect to login
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <h2>Your Tasks</h2>
//         <TaskForm onTaskAdded={fetchTasks} />
//         {loading ? <div className="loader">Loading tasks...</div> : <TaskList tasks={tasks} />}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import api from '../api/api';
import '../pages-css/Tasks.css';

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

  // 🗑 Delete task
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  // ✏ Edit task
  const handleEdit = async (task) => {
    const newTitle = prompt('Enter new title', task.title);
    if (!newTitle) return;

    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        title: newTitle,
      });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task', err);
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
        {loading ? (
          <div className="loader">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

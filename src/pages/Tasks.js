
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import TaskForm from '../components/TaskForm';
// import TaskList from '../components/TaskList';
// import api from '../api/api';
// import '../pages-css/Tasks.css';

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

//   // 🗑 Delete task
//   const handleDelete = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       setTasks((prev) => prev.filter((t) => t.id !== taskId));
//     } catch (err) {
//       console.error('Error deleting task', err);
//     }
//   };

//   // // ✏ Edit task
//   // const handleEdit = async (task) => {
//   //   const newTitle = prompt('Enter new title', task.title);
//   //   if (!newTitle) return;

//   //   try {
//   //     await api.put(`/tasks/${task.id}`, {
//   //       ...task,
//   //       title: newTitle,
//   //     });
//   //     fetchTasks();
//   //   } catch (err) {
//   //     console.error('Error updating task', err);
//   //   }
//   // };
//   // ✏ Edit task
// const handleEdit = async (task) => {
//   const newTitle = prompt('Enter new title', task.title);
//   if (!newTitle) return;

//   const newDescription = prompt('Enter new description', task.description || '');
//   if (!newDescription) return;

//   try {
//     await api.put(`/tasks/${task.id}`, {
//       title: newTitle,
//       description: newDescription
//     });
//     fetchTasks();
//   } catch (err) {
//     console.error('Error updating task', err);
//   }
// };


//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <h2>Your Tasks</h2>
//         <TaskForm onTaskAdded={fetchTasks} />
//         {loading ? (
//           <div className="loader">Loading tasks...</div>
//         ) : (
//           <TaskList 
//             tasks={tasks} 
//             onEdit={handleEdit} 
//             onDelete={handleDelete} 
//           />
//         )}
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

  // Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({ id: null, title: '', description: '' });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditTask({ id: task.id, title: task.title, description: task.description || '' });
    setIsEditing(true);
  };

  // Save edit
  const saveEdit = async () => {
    try {
      await api.put(`/tasks/${editTask.id}`, {
        title: editTask.title,
        description: editTask.description
      });
      setIsEditing(false);
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
            onEdit={openEditModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              placeholder="Description"
            />
            <div className="modal-actions">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// import React from 'react';
// import '../components-css/TaskList.css';

// export default function TaskList({ tasks, onEdit, onDelete }) {
//   if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

//   return (
//     <div className="task-list">
//       {tasks.map(t => (
//         <div className="task-item" key={t.id}>
//           <div className="task-details">
//             <div className="task-title">{t.title}</div>
//             <small className="task-desc">{t.description}</small>
//           </div>
//           <div className="task-actions">
//             <small className="task-user">{t.user?.username || '—'}</small>
//             <button 
//               className="btn-edit"
//               onClick={() => onEdit(t)}
//             >
//               Edit
//             </button>
//             <button 
//               className="btn-delete"
//               onClick={() => {
//                 if (window.confirm('Are you sure you want to delete this task?')) {
//                   onDelete(t.id);
//                 }
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState } from 'react';
import '../components-css/TaskList.css';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ id: null, title: '', description: '' });

  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

  const openEdit = (task) => {
    setEditData({ id: task.id, title: task.title, description: task.description || '' });
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!editData.title.trim()) return;
    onEdit(editData); // full object pass होईल (title + description)
    setIsEditing(false);
  };

  return (
    <div className="task-list">
      {tasks.map(t => (
        <div className="task-item" key={t.id}>
          <div className="task-details">
            <div className="task-title">{t.title}</div>
            <small className="task-desc">{t.description}</small>
          </div>
          <div className="task-actions">
            <small className="task-user">{t.user?.username || '—'}</small>
            <button className="btn-edit" onClick={() => openEdit(t)}>Edit</button>
            <button 
              className="btn-delete"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDelete(t.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
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

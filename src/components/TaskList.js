// // import React from 'react';
// // import '../components-css/TaskList.css'; // Modern CSS import
// // //import './styles.css';

// // export default function TaskList({ tasks }) {
// //   if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;
// //   return (
// //     <div className="task-list">
// //       {tasks.map(t => (
// //         <div className="task-item" key={t.id}>
// //           <div>
// //             <div style={{fontWeight:600}}>{t.title}</div>
// //             <small>{t.description}</small>
// //           </div>
// //           <div>
// //             <small>{t.user?.username || '—'}</small>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import React from 'react';
// import '../components-css/TaskList.css';

// export default function TaskList({ tasks, onEdit, onDelete }) {
//   if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

//   return (
//     <div className="task-list">
//       {tasks.map(t => (
//         <div className="task-item" key={t.id}>
//           <div>
//             <div style={{ fontWeight: 600 }}>{t.title}</div>
//             <small>{t.description}</small>
//           </div>
//           <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//             <small>{t.user?.username || '—'}</small>
//             {/* Edit Button */}
//             <button 
//               onClick={() => onEdit(t)} 
//               style={{ background: 'orange', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
//             >
//               Edit
//             </button>
//             {/* Delete Button */}
//             <button 
//               onClick={() => {
//                 if (window.confirm('Are you sure you want to delete this task?')) {
//                   onDelete(t.id);
//                 }
//               }} 
//               style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from 'react';
import '../components-css/TaskList.css';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

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
            <button 
              className="btn-edit"
              onClick={() => onEdit(t)}
            >
              Edit
            </button>
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
    </div>
  );
}

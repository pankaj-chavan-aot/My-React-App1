import React from 'react';
import '../components-css/TaskList.css'; // Modern CSS import
//import './styles.css';

export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <div className="task-list">
      {tasks.map(t => (
        <div className="task-item" key={t.id}>
          <div>
            <div style={{fontWeight:600}}>{t.title}</div>
            <small>{t.description}</small>
          </div>
          <div>
            <small>{t.user?.username || '—'}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

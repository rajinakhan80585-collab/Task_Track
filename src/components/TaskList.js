import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList({ tasks, token, onTaskUpdated, onTaskDeleted }) {
  if (!tasks || !Array.isArray(tasks)) {
    return <div className="task-list"><p>No tasks available</p></div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.task_id}
          task={task}
          token={token}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
}

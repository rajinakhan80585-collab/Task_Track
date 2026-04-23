import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

/**
 * TaskList Component
 * Renders a list of task cards
 * Handles task updates and deletions through callbacks
 *
 * @param {array} tasks - Array of task objects
 * @param {string} token - User authentication token
 * @param {function} onTaskUpdated - Callback fired when task is updated
 * @param {function} onTaskDeleted - Callback fired when task is deleted
 */
export default function TaskList({ tasks, token, onTaskUpdated, onTaskDeleted }) {
  if (!tasks || !Array.isArray(tasks)) {
    return <div className="task-list"><p>No tasks available</p></div>;
  }

  if (tasks.length === 0) {
    return <div className="task-list"><p>No tasks to display</p></div>;
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

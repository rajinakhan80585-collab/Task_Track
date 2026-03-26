import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/api';
import './TaskCard.css';

export default function TaskCard({ task, token, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editStatus, setEditStatus] = useState(task.status || 'Pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusColors = {
    'Pending': '#FFD700',
    'In Progress': '#5B8DEE',
    'Completed': '#90EE90'
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        const result = await deleteTask(token, task.task_id);
        if (result.error) {
          setError(result.error);
        } else {
          onTaskDeleted();
        }
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    setError('');
    setLoading(true);

    try {
      const updateData = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        status: editStatus
      };

      const result = await updateTask(token, task.task_id, updateData);

      if (result.error) {
        setError(result.error);
      } else {
        setIsEditing(false);
        onTaskUpdated();
      }
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditStatus(task.status || 'Pending');
    setIsEditing(false);
    setError('');
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <div className="task-edit-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="edit-actions">
            <button 
              onClick={handleSaveEdit} 
              disabled={loading}
              className="save-btn"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={handleCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: statusColors[task.status] || '#FFD700' }}
        >
          {task.status || 'Pending'}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.category_name && (
          <span className="category">{task.category_name}</span>
        )}
        {task.due_date && (
          <span className="due-date">Due: {new Date(task.due_date).toLocaleDateString()}</span>
        )}
      </div>

      <div className="task-actions">
        <button 
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          disabled={loading}
        >
          ✎ Edit
        </button>
        <button 
          onClick={handleDelete}
          className="delete-btn"
          disabled={loading}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

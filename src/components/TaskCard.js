import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/api';
import './TaskCard.css';

/**
 * TaskCard Component
 * Displays a single task with option to edit or delete
 * Inline editing mode allows updating task details
 * Supports status badge with color coding
 *
 * @param {object} task - Task object containing title, description, status, etc.
 * @param {string} token - User authentication token
 * @param {function} onTaskUpdated - Callback fired when task is updated
 * @param {function} onTaskDeleted - Callback fired when task is deleted
 */
export default function TaskCard({ task, token, onTaskUpdated, onTaskDeleted }) {
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editStatus, setEditStatus] = useState(task.status || 'Pending');
  const [editPriority, setEditPriority] = useState(task.priority || 'Medium');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Color map for task status badges
  const statusColors = {
    'Pending': '#FFD700',
    'In Progress': '#5B8DEE',
    'Completed': '#90EE90'
  };

  // Color map for priority badges
  const priorityColors = {
    'Low': '#90EE90',
    'Medium': '#FFD700',
    'High': '#FF6B6B'
  };

  /**
   * Handle task deletion with confirmation dialog
   * Calls API to delete task and notifies parent on success
   */
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

  /**
   * Handle task update
   * Sends updated data to API and exits edit mode on success
   */
  const handleSaveEdit = async () => {
    setError('');
    setLoading(true);

    try {
      const updateData = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        status: editStatus,
        priority: editPriority
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

  /**
   * Cancel edit mode and revert form to original values
   */
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditStatus(task.status || 'Pending');
    setEditPriority(task.priority || 'Medium');
    setIsEditing(false);
    setError('');
  };

  // Edit mode UI
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

          <div className="form-group">
            <label>Priority</label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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

  // View mode UI
  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span 
            className="priority-badge"
            style={{ backgroundColor: priorityColors[task.priority] || '#FFD700' }}
            title={`Priority: ${task.priority || 'Medium'}`}
          >
            {task.priority || 'Medium'}
          </span>
          <span 
            className="status-badge"
            style={{ backgroundColor: statusColors[task.status] || '#FFD700' }}
          >
            {task.status || 'Pending'}
          </span>
        </div>
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

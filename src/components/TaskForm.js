import React, { useState, useEffect, useCallback } from 'react';
import { createTask, getCategories } from '../services/api';
import './TaskForm.css';

/**
 * TaskForm Component
 * Form for creating new tasks with title, description, category, status, priority, and due date
 * Fetches available categories on mount and handles task creation
 *
 * @param {string} token - User authentication token
 * @param {function} onTaskAdded - Callback fired when task is successfully created
 */
export default function TaskForm({ token, onTaskAdded }) {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');

  // UI state
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  /**
   * Fetch available categories from API
   * Automatically sets first category as default if available
   */
  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories(token);
      if (result.error) {
        // Silently handle category fetch errors to not block task form
        setError('Could not load categories');
      } else if (result.categories && Array.isArray(result.categories)) {
        setCategories(result.categories);
        // Set first category as default if available
        if (result.categories.length > 0) {
          setCategoryId(result.categories[0].category_id);
        }
      }
    } catch (err) {
      // Network or parsing error - do not block form display
      setError('Failed to load categories');
    } finally {
      setFetchingCategories(false);
    }
  }, [token]);

  useEffect(() => {
    // Fetch categories on component mount
    fetchCategories();
  }, [token, fetchCategories]);

  /**
   * Handle form submission
   * Validates title, creates task via API, then clears form and notifies parent
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        category_id: categoryId || null,
        due_date: dueDate || null,
        status: status,
        priority: priority
      };

      const result = await createTask(token, taskData);

      if (result.error) {
        setError(result.error);
      } else {
        // Clear form on success
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('Pending');
        setPriority('Medium');
        
        // Notify parent component to refresh task list
        if (onTaskAdded) {
          onTaskAdded();
        }
      }
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h3>Create New Task</h3>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description (optional)"
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="category">Category</label>
            {fetchingCategories ? (
              <p>Loading categories...</p>
            ) : (
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group half-width">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group half-width">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || fetchingCategories}
          className="submit-btn"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

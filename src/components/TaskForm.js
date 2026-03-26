import React, { useState, useEffect, useCallback } from 'react';
import { createTask, getCategories } from '../services/api';
import './TaskForm.css';

export default function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories(token);
      if (result.error) {
        console.error('Error fetching categories:', result.error);
      } else if (result.categories && Array.isArray(result.categories)) {
        setCategories(result.categories);
        // Set first category as default if available
        if (result.categories.length > 0) {
          setCategoryId(result.categories[0].category_id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    } finally {
      setFetchingCategories(false);
    }
  }, [token]);

  useEffect(() => {
    // Fetch categories on component mount
    fetchCategories();
  }, [token, fetchCategories]);

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
        status: status
      };

      const result = await createTask(token, taskData);

      if (result.error) {
        setError(result.error);
      } else {
        // Clear form
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('Pending');
        
        // Notify parent
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

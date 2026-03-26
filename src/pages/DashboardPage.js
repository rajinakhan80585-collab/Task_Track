import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import './DashboardPage.css';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getTasks(token);
      
      if (result.error) {
        setError(result.error);
      } else if (result.tasks) {
        setTasks(Array.isArray(result.tasks) ? result.tasks : []);
      } else if (Array.isArray(result)) {
        setTasks(result);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Check if user is logged in
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch tasks
    fetchTasks();
  }, [token, navigate, fetchTasks]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTaskAdded = () => {
    setShowForm(false);
    fetchTasks(); // Refresh tasks
  };

  const handleTaskUpdated = () => {
    fetchTasks(); // Refresh tasks
  };

  const handleTaskDeleted = () => {
    fetchTasks(); // Refresh tasks
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Task Track Dashboard</h1>
        <div className="header-actions">
          <span className="user-name">Welcome, {user.name || 'User'}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="sidebar">
          <button 
            className="new-task-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ New Task'}
          </button>
        </div>

        <main className="main-content">
          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <TaskForm 
              token={token}
              onTaskAdded={handleTaskAdded}
            />
          )}

          <section className="tasks-section">
            <h2>Your Tasks</h2>
            {loading ? (
              <p className="loading">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="no-tasks">No tasks yet. Create one to get started!</p>
            ) : (
              <TaskList 
                tasks={tasks}
                token={token}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

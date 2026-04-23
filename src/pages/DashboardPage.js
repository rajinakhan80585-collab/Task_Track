import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilterSort from '../components/TaskFilterSort';
import LoadingSpinner, { ListSkeleton } from '../components/LoadingSpinner';
import './DashboardPage.css';

/**
 * DashboardPage Component
 * Main page showing user's tasks with ability to create, update, and delete tasks
 * Displays user greeting and logout functionality
 * Includes search, filter, and sort capabilities
 *
 * @param {function} addToast - Callback to show toast notifications
 */
export default function DashboardPage({ addToast = () => {} }) {
  // Task state
  const [tasks, setTasks] = useState([]);

  // Filter and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  /**
   * Fetch all tasks from API
   * Updates tasks state or shows error if fetch fails
   */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getTasks(token);
      
      if (result.error) {
        setError(result.error);
        addToast(result.error, 'error');
      } else if (result.tasks) {
        setTasks(Array.isArray(result.tasks) ? result.tasks : []);
      } else if (Array.isArray(result)) {
        setTasks(result);
      } else {
        setTasks([]);
      }
    } catch (err) {
      const errorMsg = 'Failed to fetch tasks';
      setError(errorMsg);
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [token, addToast]);

  /**
   * Filter and sort tasks based on user preferences
   * Searches task titles and descriptions
   * Filters by status
   * Sorts by date, title, or status
   */
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        const statusOrder = { 'Pending': 0, 'In Progress': 1, 'Completed': 2 };
        sorted.sort((a, b) => (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0));
        break;
      case 'due-date':
        sorted.sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date) - new Date(b.due_date);
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [tasks, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch tasks on component mount
    fetchTasks();
  }, [token, navigate, fetchTasks]);

  /**
   * Handle logout - clear auth data and redirect to login
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    addToast('Logged out successfully', 'success');
    navigate('/login');
  };

  /**
   * Handle task creation - close form and refresh task list
   */
  const handleTaskAdded = () => {
    setShowForm(false);
    addToast('Task created successfully!', 'success');
    fetchTasks(); // Refresh tasks
  };

  /**
   * Handle task update - refresh task list
   */
  const handleTaskUpdated = () => {
    addToast('Task updated successfully!', 'success');
    fetchTasks(); // Refresh tasks
  };

  /**
   * Handle task deletion - refresh task list
   */
  const handleTaskDeleted = () => {
    addToast('Task deleted successfully!', 'success');
    fetchTasks(); // Refresh tasks
  };

  /**
   * Calculate task statistics for dashboard overview
   */
  const taskStats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const highPriority = tasks.filter(t => t.priority === 'High').length;
    const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    return { completed, pending, inProgress, highPriority, completionRate, total: tasks.length };
  }, [tasks]);

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
          {!loading && tasks.length > 0 && (
            <div className="stats-container">
              <div className="stat-card stat-total">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>Total Tasks</h3>
                  <p className="stat-number">{taskStats.total}</p>
                </div>
              </div>

              <div className="stat-card stat-completed">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Completed</h3>
                  <p className="stat-number">{taskStats.completed}</p>
                </div>
              </div>

              <div className="stat-card stat-pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h3>Pending</h3>
                  <p className="stat-number">{taskStats.pending}</p>
                </div>
              </div>

              <div className="stat-card stat-progress">
                <div className="stat-icon">🚀</div>
                <div className="stat-info">
                  <h3>In Progress</h3>
                  <p className="stat-number">{taskStats.inProgress}</p>
                </div>
              </div>

              <div className="stat-card stat-priority">
                <div className="stat-icon">🔴</div>
                <div className="stat-info">
                  <h3>High Priority</h3>
                  <p className="stat-number">{taskStats.highPriority}</p>
                </div>
              </div>

              <div className="stat-card stat-rate">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Completion Rate</h3>
                  <p className="stat-number">{taskStats.completionRate}%</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${taskStats.completionRate}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
              <button onClick={() => setError('')} className="close-error">✕</button>
            </div>
          )}

          {showForm && (
            <TaskForm 
              token={token}
              onTaskAdded={handleTaskAdded}
            />
          )}

          <section className="tasks-section">
            <h2>Your Tasks {tasks.length > 0 && `(${filteredAndSortedTasks.length})`}</h2>
            
            {!loading && tasks.length > 0 && (
              <TaskFilterSort
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            )}

            {loading ? (
              <ListSkeleton count={3} />
            ) : tasks.length === 0 ? (
              <p className="no-tasks">No tasks yet. Create one to get started!</p>
            ) : filteredAndSortedTasks.length === 0 ? (
              <p className="no-tasks">No tasks match your search or filters.</p>
            ) : (
              <TaskList 
                tasks={filteredAndSortedTasks}
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

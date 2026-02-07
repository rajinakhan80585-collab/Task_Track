# Task Track - React Frontend Setup

## Quick Start

### 1. Create React App
```bash
cd frontend
npx create-react-app .
```

### 2. Install Additional Dependencies
```bash
npm install axios react-router-dom
```

### 3. Create .env file
```bash
# In frontend folder
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start Development Server
```bash
npm start
```

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   └── Categories/
│   │       ├── CategoryList.jsx
│   │       └── CategoryForm.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

## Implementation Guide

### Step 1: Set Up API Service
Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### Step 2: Auth Service
Create `src/services/authService.js`:
```javascript
import api from './api';

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

### Step 3: Task Service
Create `src/services/taskService.js`:
```javascript
import api from './api';

export const getTasks = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

export const getTask = async (id) => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/api/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/api/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/api/tasks/${id}`);
  return response.data;
};
```

### Step 4: Basic App.js with Routing
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Basic Components Examples

### Login Component
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Task Track</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}

export default LoginPage;
```

### Dashboard Component
```javascript
import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <header>
        <h1>Task Track Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="tasks-container">
        <h2>My Tasks ({tasks.length})</h2>
        {tasks.map(task => (
          <div key={task.task_id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`status ${task.status.toLowerCase()}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
```

## Styling Tips

### Basic CSS Structure
```css
/* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

.login-container,
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.task-item {
  background: white;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status.pending {
  background-color: #ffc107;
  color: #000;
}

.status.in-progress {
  background-color: #17a2b8;
  color: white;
}

.status.completed {
  background-color: #28a745;
  color: white;
}
```

## Deployment to Render

### Build Settings for Render
In Render dashboard:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Environment Variable**: 
  - Key: `REACT_APP_API_URL`
  - Value: `https://your-backend.onrender.com`

## Next Steps

1. Complete all CRUD operations for tasks
2. Add category management
3. Implement task filtering and search
4. Add form validation
5. Improve UI/UX with better styling
6. Add loading states and error handling
7. Implement toast notifications

## Resources

- React Router: https://reactrouter.com
- Axios: https://axios-http.com
- React Hooks: https://react.dev/reference/react

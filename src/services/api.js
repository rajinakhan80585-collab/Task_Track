// API Service for Task Track Backend
const API_BASE = 'http://localhost:5000'; // Update this for production

// Auth endpoints
export const registerUser = (email, password, name, mobile) =>
  fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, mobile })
  }).then(r => r.json());

export const loginUser = (email, password) =>
  fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(r => r.json());

// Tasks endpoints
export const getTasks = (token) =>
  fetch(`${API_BASE}/api/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());

export const createTask = (token, taskData) =>
  fetch(`${API_BASE}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  }).then(r => r.json());

export const updateTask = (token, taskId, taskData) =>
  fetch(`${API_BASE}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  }).then(r => r.json());

export const deleteTask = (token, taskId) =>
  fetch(`${API_BASE}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());

// Categories endpoints
export const getCategories = (token) =>
  fetch(`${API_BASE}/api/categories`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());

export const createCategory = (token, categoryData) =>
  fetch(`${API_BASE}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(categoryData)
  }).then(r => r.json());

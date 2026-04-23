import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './pages/ErrorBoundary';
import { ToastContainer, useToast } from './components/Toast';
import './App.css';

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

/**
 * App Component
 * Main application component with routing and global error handling
 */
function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage addToast={addToast} />} />
          <Route path="/register" element={<RegisterPage addToast={addToast} />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage addToast={addToast} />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* 404 Not Found - Catch all remaining routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Toast Container */}
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
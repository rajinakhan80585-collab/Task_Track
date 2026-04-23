import React, { useState, useEffect } from 'react';
import '../components/Toast.css';

/**
 * Toast Component
 * Displays temporary notification messages for user feedback
 * Automatically dismisses after a specified duration
 * 
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', or 'info'
 * @param {number} duration - Duration in milliseconds before auto-dismiss (default: 3000)
 * @param {function} onClose - Callback when toast closes
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ℹ'}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

/**
 * ToastContainer Component
 * Manages multiple toast notifications
 */
export const ToastContainer = ({ toasts = [], onClose }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};

/**
 * Hook to manage toast notifications
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export default Toast;

import React from 'react';
import '../components/LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Displays an animated loading spinner with optional text
 * Used for indicating data fetching or processing
 * 
 * @param {string} message - Optional loading message to display below spinner
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

/**
 * TaskSkeleton Component
 * Displays a skeleton loader for task cards while data loads
 */
export const TaskSkeleton = () => {
  return (
    <div className="task-skeleton">
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-footer">
        <div className="skeleton-category"></div>
        <div className="skeleton-status"></div>
      </div>
    </div>
  );
};

/**
 * ListSkeleton Component
 * Displays multiple skeleton loaders for task list
 */
export const ListSkeleton = ({ count = 3 }) => {
  return (
    <div className="list-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSpinner;

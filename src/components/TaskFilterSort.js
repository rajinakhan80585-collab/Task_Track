import React from 'react';
import './TaskFilterSort.css';

/**
 * TaskFilterSort Component
 * Provides search, filter by status, and sort options for tasks
 * Updates parent component with filter/sort preferences
 *
 * @param {string} searchTerm - Current search term
 * @param {function} onSearchChange - Callback for search input changes
 * @param {string} statusFilter - Current status filter ('All', 'Pending', 'In Progress', 'Completed')
 * @param {function} onStatusFilterChange - Callback for status filter changes
 * @param {string} sortBy - Current sort field ('date', 'status', 'title')
 * @param {function} onSortByChange - Callback for sort field changes
 */
const TaskFilterSort = ({
  searchTerm = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusFilterChange,
  sortBy = 'date',
  onSortByChange
}) => {
  return (
    <div className="filter-sort-container">
      <div className="filter-sort-controls">
        {/* Search Input */}
        <div className="control-group">
          <label htmlFor="search">🔍 Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Status Filter */}
        <div className="control-group">
          <label htmlFor="status-filter">📊 Filter by Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="control-group">
          <label htmlFor="sort-by">↕️ Sort By</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="filter-select"
          >
            <option value="date">Date Created (Newest)</option>
            <option value="date-asc">Date Created (Oldest)</option>
            <option value="title">Title (A-Z)</option>
            <option value="status">Status</option>
            <option value="due-date">Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterSort;

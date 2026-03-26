import React, { useState, useEffect, useCallback } from 'react';
import { getCategories, createCategory } from '../services/api';
import './CategorySelector.css';

export default function CategorySelector({ token, selectedId, onCategorySelect, showCreateForm = false }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [error, setError] = useState('');
  const [showNewForm, setShowNewForm] = useState(showCreateForm);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getCategories(token);
      if (result.error) {
        setError(result.error);
      } else {
        setCategories(result.data || result || []);
      }
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setError('');

    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setCreatingCategory(true);

    try {
      const result = await createCategory(token, { name: newCategoryName });
      if (result.error) {
        setError(result.error);
      } else {
        setNewCategoryName('');
        setShowNewForm(false);
        fetchCategories();
      }
    } catch (err) {
      setError('Failed to create category');
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <div className="category-selector">
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <>
          <select 
            value={selectedId || ''} 
            onChange={(e) => onCategorySelect && onCategorySelect(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {showNewForm && (
            <form onSubmit={handleCreateCategory} className="new-category-form">
              {error && <div className="error-message">{error}</div>}
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                disabled={creatingCategory}
              />
              <button type="submit" disabled={creatingCategory}>
                {creatingCategory ? 'Creating...' : 'Create'}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

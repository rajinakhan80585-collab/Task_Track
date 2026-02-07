const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/connection');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/categories
// @desc    Get all categories for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY name',
      [req.user.userId]
    );

    res.json({
      success: true,
      count: result.rows.length,
      categories: result.rows
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching categories' 
    });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private
router.post('/', [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name } = req.body;

    // Check if category already exists for this user
    const existingCategory = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 AND name = $2',
      [req.user.userId, name]
    );

    if (existingCategory.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name already exists' 
      });
    }

    const result = await pool.query(
      'INSERT INTO categories (user_id, name) VALUES ($1, $2) RETURNING *',
      [req.user.userId, name]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: result.rows[0]
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating category' 
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Private
router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const { name } = req.body;

    // Check if category exists and belongs to user
    const categoryCheck = await pool.query(
      'SELECT * FROM categories WHERE category_id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (categoryCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    const result = await pool.query(
      'UPDATE categories SET name = $1 WHERE category_id = $2 AND user_id = $3 RETURNING *',
      [name, id, req.user.userId]
    );

    res.json({
      success: true,
      message: 'Category updated successfully',
      category: result.rows[0]
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating category' 
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM categories WHERE category_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting category' 
    });
  }
});

module.exports = router;

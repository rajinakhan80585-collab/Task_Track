const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/connection');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, c.name as category_name 
       FROM tasks t 
       LEFT JOIN categories c ON t.category_id = c.category_id 
       WHERE t.user_id = $1 
       ORDER BY t.created_at DESC`,
      [req.user.userId]
    );

    res.json({
      success: true,
      count: result.rows.length,
      tasks: result.rows
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching tasks' 
    });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name as category_name 
       FROM tasks t 
       LEFT JOIN categories c ON t.category_id = c.category_id 
       WHERE t.task_id = $1 AND t.user_id = $2`,
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    res.json({
      success: true,
      task: result.rows[0]
    });

  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching task' 
    });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status, due_date, category_id } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, due_date, category_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [req.user.userId, title, description || null, status || 'Pending', due_date || null, category_id || null]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: result.rows[0]
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating task' 
    });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update an existing task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date, category_id } = req.body;

    // Check if task exists and belongs to user
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    const result = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           due_date = COALESCE($4, due_date),
           category_id = COALESCE($5, category_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE task_id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, status, due_date, category_id, id, req.user.userId]
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      task: result.rows[0]
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating task' 
    });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting task' 
    });
  }
});

module.exports = router;

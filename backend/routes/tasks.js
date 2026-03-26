const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/connection');
const authMiddleware = require('../middleware/auth');

// All task routes require a valid JWT token
router.use(authMiddleware);

// Helper: validate that an :id param is a positive integer
// Returns false and sends a 400 response if invalid
function validateId(id, res) {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed) || parsed <= 0) {
    res.status(400).json({ success: false, message: 'Invalid ID — must be a positive integer' });
    return false;
  }
  return parsed;
}

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user (includes category name via JOIN)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, c.name AS category_name
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.category_id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC`,
      [req.user.userId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      tasks: result.rows
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching tasks' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID (must belong to the logged-in user)
// @access  Private
router.get('/:id', async (req, res) => {
  const id = validateId(req.params.id, res);
  if (!id) return;

  try {
    const result = await pool.query(
      `SELECT t.*, c.name AS category_name
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.category_id
       WHERE t.task_id = $1 AND t.user_id = $2`,
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, task: result.rows[0] });

  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching task' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task for the logged-in user
// @access  Private
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed')
], async (req, res) => {
  try {
    // Return 400 if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status, due_date, category_id } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, due_date, category_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        req.user.userId,
        title,
        description || null,
        status || 'Pending',
        due_date || null,
        category_id || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: result.rows[0]
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Server error creating task' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update an existing task (only fields provided will change — uses COALESCE)
// @access  Private
router.put('/:id', [
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed')
], async (req, res) => {
  const id = validateId(req.params.id, res);
  if (!id) return;

  try {
    // Return 400 if status value is invalid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status, due_date, category_id } = req.body;

    // Confirm the task exists and belongs to the current user
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // COALESCE keeps existing values for any field not provided in the request
    const result = await pool.query(
      `UPDATE tasks
       SET title       = COALESCE($1, title),
           description = COALESCE($2, description),
           status      = COALESCE($3, status),
           due_date    = COALESCE($4, due_date),
           category_id = COALESCE($5, category_id),
           updated_at  = CURRENT_TIMESTAMP
       WHERE task_id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, status, due_date, category_id, id, req.user.userId]
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: result.rows[0]
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, message: 'Server error updating task' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task (must belong to the logged-in user)
// @access  Private
router.delete('/:id', async (req, res) => {
  const id = validateId(req.params.id, res);
  if (!id) return;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting task' });
  }
});

module.exports = router;

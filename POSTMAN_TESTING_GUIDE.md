# Task Track API - Postman Testing Guide

## Project Information

**Live API URL:** `https://tasktrack-backend-j0pl.onrender.com`

**GitHub Repository:** `https://github.com/rajinakhan80585-collab/Task_Track`

**Local Development URL:** `http://localhost:5000`

---

## Base URL
```
Production: https://tasktrack-backend-j0pl.onrender.com/api
Local: http://localhost:5000/api
```

---

## 1. Authentication Routes

### 1.1 Register User
**Endpoint:** `POST /api/auth/register`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/auth/register`

**Request Body:**
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "Test@123"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com"
  }
}
```

**Possible Errors:**
- `400`: User already exists
- `400`: Validation errors (weak password, invalid email, etc.)

---

### 1.2 Login User
**Endpoint:** `POST /api/auth/login`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/auth/login`

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "Test@123"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "testuser@example.com"
  }
}
```

**Possible Errors:**
- `401`: Invalid credentials
- `404`: User not found

**Note:** Copy the token from the response and use it in the Authorization header for protected routes.

---

### 1.3 Get Current User Profile
**Endpoint:** `GET /api/auth/me`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/auth/me`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "username": "testuser",
  "email": "testuser@example.com",
  "created_at": "2026-02-07T10:30:00.000Z"
}
```

**Possible Errors:**
- `401`: No token provided
- `401`: Invalid token
- `401`: Token expired

---

## 2. Category Routes

### 2.1 Create Category
**Endpoint:** `POST /api/categories`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Work",
  "color": "#FF5733"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 1,
    "name": "Work",
    "color": "#FF5733",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `400`: Category name is required
- `400`: Category already exists
- `401`: Unauthorized (no token or invalid token)

---

### 2.2 Get All Categories
**Endpoint:** `GET /api/categories`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Work",
      "color": "#FF5733",
      "user_id": 1,
      "created_at": "2026-02-07T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Personal",
      "color": "#33C3FF",
      "user_id": 1,
      "created_at": "2026-02-07T10:35:00.000Z"
    }
  ]
}
```

**Possible Errors:**
- `401`: Unauthorized

---

### 2.3 Get Single Category
**Endpoint:** `GET /api/categories/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "category": {
    "id": 1,
    "name": "Work",
    "color": "#FF5733",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Category not found
- `403`: Not authorized to access this category

---

### 2.4 Update Category
**Endpoint:** `PUT /api/categories/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Work Projects",
  "color": "#FF6B6B"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Category updated successfully",
  "category": {
    "id": 1,
    "name": "Work Projects",
    "color": "#FF6B6B",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T11:00:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Category not found
- `403`: Not authorized to update this category

---

### 2.5 Delete Category
**Endpoint:** `DELETE /api/categories/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "message": "Category deleted successfully"
}
```

**Possible Errors:**
- `404`: Category not found
- `403`: Not authorized to delete this category
- `400`: Cannot delete category with existing tasks

---

## 3. Task Routes

### 3.1 Create Task
**Endpoint:** `POST /api/tasks`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "category_id": 1,
  "priority": "high",
  "due_date": "2026-02-15",
  "status": "pending"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "category_id": 1,
    "priority": "high",
    "due_date": "2026-02-15T00:00:00.000Z",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `400`: Title is required
- `400`: Invalid priority (must be: low, medium, high)
- `400`: Invalid status (must be: pending, in-progress, completed)
- `401`: Unauthorized

---

### 3.2 Get All Tasks
**Endpoint:** `GET /api/tasks`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Query Parameters (Optional):**
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `category_id` - Filter by category ID

**Example with filters:** `GET /api/tasks?status=pending&priority=high`

**Expected Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "category_id": 1,
      "category_name": "Work",
      "category_color": "#FF5733",
      "priority": "high",
      "due_date": "2026-02-15T00:00:00.000Z",
      "status": "pending",
      "user_id": 1,
      "created_at": "2026-02-07T10:30:00.000Z",
      "updated_at": "2026-02-07T10:30:00.000Z"
    },
    {
      "id": 2,
      "title": "Review pull requests",
      "description": "Review team's code submissions",
      "category_id": 1,
      "category_name": "Work",
      "category_color": "#FF5733",
      "priority": "medium",
      "due_date": "2026-02-10T00:00:00.000Z",
      "status": "in-progress",
      "user_id": 1,
      "created_at": "2026-02-07T11:00:00.000Z",
      "updated_at": "2026-02-07T11:00:00.000Z"
    }
  ]
}
```

**Possible Errors:**
- `401`: Unauthorized

---

### 3.3 Get Single Task
**Endpoint:** `GET /api/tasks/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "category_id": 1,
    "category_name": "Work",
    "category_color": "#FF5733",
    "priority": "high",
    "due_date": "2026-02-15T00:00:00.000Z",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Task not found
- `403`: Not authorized to access this task

---

### 3.4 Update Task
**Endpoint:** `PUT /api/tasks/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "title": "Complete API documentation",
  "description": "Write and review comprehensive API documentation",
  "category_id": 1,
  "priority": "medium",
  "due_date": "2026-02-20",
  "status": "in-progress"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Complete API documentation",
    "description": "Write and review comprehensive API documentation",
    "category_id": 1,
    "priority": "medium",
    "due_date": "2026-02-20T00:00:00.000Z",
    "status": "in-progress",
    "user_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T12:00:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Task not found
- `403`: Not authorized to update this task
- `400`: Invalid priority or status

---

### 3.5 Delete Task
**Endpoint:** `DELETE /api/tasks/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

**Possible Errors:**
- `404`: Task not found
- `403`: Not authorized to delete this task

---

## 4. Dashboard/Statistics Routes (if implemented)

### 4.1 Get Task Statistics
**Endpoint:** `GET /api/tasks/stats`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks/stats`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "stats": {
    "total_tasks": 15,
    "pending": 5,
    "in_progress": 7,
    "completed": 3,
    "high_priority": 4,
    "medium_priority": 6,
    "low_priority": 5,
    "overdue": 2
  }
}
```

---

## Testing Workflow in Postman

### Step 1: Register a New User
1. Create a new request: `POST /api/auth/register`
2. Add the request body with username, email, and password
3. Send the request
4. Copy the token from the response

### Step 2: Login (Alternative to Register)
1. Create a new request: `POST /api/auth/login`
2. Add email and password in the request body
3. Send the request
4. Copy the token from the response

### Step 3: Set Up Authorization
1. In Postman, go to the "Authorization" tab
2. Select "Bearer Token" from the Type dropdown
3. Paste your token in the Token field
4. Or create an environment variable called `auth_token` and use `{{auth_token}}`

### Step 4: Create Categories
1. Create a request: `POST /api/categories`
2. Add Authorization header with your token
3. Add request body with category name and color
4. Send and verify the response

### Step 5: Create Tasks
1. Create a request: `POST /api/tasks`
2. Add Authorization header
3. Add request body with task details
4. Use the category_id from the previous step
5. Send and verify the response

### Step 6: Test CRUD Operations
1. Test GET all tasks
2. Test GET single task
3. Test UPDATE task
4. Test DELETE task

---

## Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Not authorized to access this resource
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Tips for Testing

1. **Save your token**: After login/register, save the token as an environment variable in Postman
2. **Use Collections**: Organize all requests in a Postman collection
3. **Test in order**: Register → Login → Create Category → Create Task → Test other endpoints
4. **Check responses**: Verify that response structure matches expected format
5. **Test error cases**: Try invalid data, missing fields, unauthorized access, etc.
6. **Production vs Local**: Create separate environments in Postman for production and local testing

---

## Environment Variables in Postman

Create these variables in Postman:
- `base_url_production`: `https://tasktrack-backend-j0pl.onrender.com/api`
- `base_url_local`: `http://localhost:5000/api`
- `auth_token`: (paste your JWT token here after login)

Then use `{{base_url_production}}` or `{{base_url_local}}` in your requests!

---

## Need Help?

- **GitHub Issues:** https://github.com/rajinakhan80585-collab/Task_Track/issues
- **Email:** Rajinakhan80585@gmail.com

---

**Last Updated:** February 7, 2026

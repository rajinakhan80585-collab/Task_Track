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
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com",
    "createdAt": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `400`: User already exists with this email
- `400`: Validation errors (password must be at least 6 characters, invalid email, etc.)

---

### 1.2 Login User
**Endpoint:** `POST /api/auth/login`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/auth/login`

**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
```

**Possible Errors:**
- `401`: Invalid credentials

**Note:** Copy the token from the response and use it in the Authorization header for protected routes.

---

### 1.3 Get Current User Profile
**Endpoint:** `GET /api/auth/profile`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/auth/profile`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@example.com",
    "createdAt": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `401`: No token provided / Invalid token
- `404`: User not found

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
  "name": "Work"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "category_id": 1,
    "user_id": 1,
    "name": "Work",
    "created_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `400`: Category name is required
- `400`: Category with this name already exists
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
  "success": true,
  "count": 2,
  "categories": [
    {
      "category_id": 1,
      "user_id": 1,
      "name": "Personal",
      "created_at": "2026-02-07T10:30:00.000Z"
    },
    {
      "category_id": 2,
      "user_id": 1,
      "name": "Work",
      "created_at": "2026-02-07T10:35:00.000Z"
    }
  ]
}
```

**Possible Errors:**
- `401`: Unauthorized

---

### 2.3 Update Category
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
  "name": "Work Projects"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "category": {
    "category_id": 1,
    "user_id": 1,
    "name": "Work Projects",
    "created_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Category not found
- `401`: Unauthorized

---

### 2.4 Delete Category
**Endpoint:** `DELETE /api/categories/:id`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/categories/1`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Possible Errors:**
- `404`: Category not found
- `401`: Unauthorized

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
  "status": "Pending",
  "due_date": "2026-02-15"
}
```

**Note:** Valid status values are: `Pending`, `In Progress`, `Completed`

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "task_id": 1,
    "user_id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "Pending",
    "due_date": "2026-02-15T00:00:00.000Z",
    "category_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T10:30:00.000Z"
  }
}
```

**Possible Errors:**
- `400`: Title is required
- `400`: Invalid status (must be: Pending, In Progress, or Completed)
- `401`: Unauthorized

---

### 3.2 Get All Tasks
**Endpoint:** `GET /api/tasks`

**Full URL (Production):** `https://tasktrack-backend-j0pl.onrender.com/api/tasks`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "task_id": 2,
      "user_id": 1,
      "category_id": 1,
      "title": "Review pull requests",
      "description": "Review team's code submissions",
      "status": "In Progress",
      "due_date": "2026-02-10T00:00:00.000Z",
      "created_at": "2026-02-07T11:00:00.000Z",
      "updated_at": "2026-02-07T11:00:00.000Z",
      "category_name": "Work"
    },
    {
      "task_id": 1,
      "user_id": 1,
      "category_id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "status": "Pending",
      "due_date": "2026-02-15T00:00:00.000Z",
      "created_at": "2026-02-07T10:30:00.000Z",
      "updated_at": "2026-02-07T10:30:00.000Z",
      "category_name": "Work"
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
  "success": true,
  "task": {
    "task_id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "Pending",
    "due_date": "2026-02-15T00:00:00.000Z",
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T10:30:00.000Z",
    "category_name": "Work"
  }
}
```

**Possible Errors:**
- `404`: Task not found
- `401`: Unauthorized

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
  "status": "In Progress",
  "due_date": "2026-02-20"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "task_id": 1,
    "user_id": 1,
    "title": "Complete API documentation",
    "description": "Write and review comprehensive API documentation",
    "status": "In Progress",
    "due_date": "2026-02-20T00:00:00.000Z",
    "category_id": 1,
    "created_at": "2026-02-07T10:30:00.000Z",
    "updated_at": "2026-02-07T12:00:00.000Z"
  }
}
```

**Possible Errors:**
- `404`: Task not found
- `401`: Unauthorized

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
  "success": true,
  "message": "Task deleted successfully"
}
```

**Possible Errors:**
- `404`: Task not found
- `401`: Unauthorized

---

## Testing Workflow in Postman

### Step 1: Register a New User
1. Create a new request: `POST https://tasktrack-backend-j0pl.onrender.com/api/auth/register`
2. Set Body → raw → JSON
3. Add the request body with name, email, and password
4. Send the request
5. Copy the `token` from the response

### Step 2: Login (Alternative to Register)
1. Create a new request: `POST https://tasktrack-backend-j0pl.onrender.com/api/auth/login`
2. Add email and password in the request body
3. Send the request
4. Copy the `token` from the response

### Step 3: Set Up Authorization for All Protected Routes
**Option A: Per Request**
1. In each request, go to the "Authorization" tab
2. Select "Bearer Token" from the Type dropdown
3. Paste your token in the Token field

**Option B: Collection Level (Recommended)**
1. Create a Collection in Postman
2. Right-click collection → Edit
3. Go to Authorization tab
4. Select "Bearer Token"
5. Paste your token
6. All requests in the collection will use this token

**Option C: Environment Variables (Best Practice)**
1. Create an environment in Postman
2. Add variable: `auth_token` = (your token)
3. In Authorization, use: `{{auth_token}}`
4. Update token value when you login

### Step 4: Test Get Profile
1. Create request: `GET https://tasktrack-backend-j0pl.onrender.com/api/auth/profile`
2. Add Authorization: Bearer Token
3. Send and verify you get your user info

### Step 5: Create Categories
1. Create request: `POST https://tasktrack-backend-j0pl.onrender.com/api/categories`
2. Add Authorization header
3. Body: `{"name": "Work"}`
4. Send and save the `category_id` from response

### Step 6: Create Tasks
1. Create request: `POST https://tasktrack-backend-j0pl.onrender.com/api/tasks`
2. Add Authorization header
3. Add request body with task details (include the category_id from previous step)
4. Send and verify the response

### Step 7: Test All CRUD Operations
1. GET all tasks
2. GET single task by ID
3. UPDATE a task
4. DELETE a task

---

## Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data or validation error
- `401 Unauthorized` - Missing or invalid authentication token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Important Notes

### Status Values for Tasks
Tasks can only have these status values:
- `Pending`
- `In Progress`
- `Completed`

(Case sensitive! Must match exactly)

### Authentication Token
- Token is required for ALL routes except `/api/auth/register` and `/api/auth/login`
- Token format in header: `Authorization: Bearer YOUR_TOKEN_HERE`
- Tokens expire after 7 days (configurable)
- Get a new token by logging in again

### Response Format
All responses include a `success` field:
- `"success": true` - Request was successful
- `"success": false` - Request failed (check `message` or `errors` field)

---

## Environment Variables in Postman

Create these variables in your Postman environment:

**For Production Testing:**
- `base_url`: `https://tasktrack-backend-j0pl.onrender.com/api`
- `auth_token`: (paste your JWT token after login)

**For Local Testing:**
- `base_url`: `http://localhost:5000/api`
- `auth_token`: (paste your JWT token after login)

Then use `{{base_url}}` in your requests:
- `POST {{base_url}}/auth/login`
- `GET {{base_url}}/tasks`
- etc.

---

## Tips for Testing

1. **Save your token**: After login/register, copy the token and save it as an environment variable
2. **Use Collections**: Organize all requests in a Postman collection for easy management
3. **Test in order**: Register → Login → Create Category → Create Task → Test other endpoints
4. **Check responses**: Verify that response structure matches expected format
5. **Test error cases**: Try invalid data, missing fields, unauthorized access
6. **Use the correct status values**: `Pending`, `In Progress`, or `Completed` (case sensitive)

---

## Quick Test Checklist

- [ ] Register new user - get token
- [ ] Login with user - verify token
- [ ] Get user profile with token
- [ ] Create a category
- [ ] Get all categories
- [ ] Update a category
- [ ] Create a task with category
- [ ] Get all tasks
- [ ] Get single task
- [ ] Update task status to "In Progress"
- [ ] Update task status to "Completed"
- [ ] Delete a task
- [ ] Delete a category

---

## Need Help?

- **GitHub Issues:** https://github.com/rajinakhan80585-collab/Task_Track/issues
- **Email:** Rajinakhan80585@gmail.com

---

**Last Updated:** February 7, 2026

# Task Track - Backend API

## Project Links
- **Live API**: `https://tasktrack-backend-j0pl.onrender.com`
- **GitHub Repository**: `https://github.com/rajinakhan80585-collab/Task_Track`
- **Postman Testing Guide**: See `POSTMAN_TESTING_GUIDE.md` in root folder

## Quick Start Guide

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Then edit `.env` with your Render PostgreSQL credentials:
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Run Database Migration
```bash
npm run migrate
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Task Routes (All Protected)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Category Routes (All Protected)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Testing with Postman/Thunder Client

### 1. Register a User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Rajina",
  "email": "rajina@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "rajina@example.com",
  "password": "password123"
}
```
Save the token from the response!

### 3. Create a Task (with token)
```
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Complete assignment",
  "description": "Finish Task Track project",
  "status": "In Progress",
  "due_date": "2026-02-10"
}
```

## Database Schema

### Users Table
- user_id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)

### Categories Table
- category_id (SERIAL PRIMARY KEY)
- user_id (FOREIGN KEY)
- name (VARCHAR)
- created_at (TIMESTAMP)

### Tasks Table
- task_id (SERIAL PRIMARY KEY)
- user_id (FOREIGN KEY)
- category_id (FOREIGN KEY)
- title (VARCHAR)
- description (TEXT)
- status (VARCHAR: 'Pending', 'In Progress', 'Completed')
- due_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

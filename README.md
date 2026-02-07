# 🎯 Task Track - Full Stack Task Management Application

**Student**: Rajina  
**Student Number**: 9030748  
**Course**: PROG2500 - Open-Source Full Stack Development  
**Professor**: Johan Prinz  
**Semester**: Winter 2026

---

## 📋 Project Overview

Task Track is a complete web application that enables users to manage their daily tasks from a single platform. Built with Node.js, Express, PostgreSQL, and React.

### Live Demo
- **Backend API**: `https://tasktrack-backend-j0pl.onrender.com`
- **GitHub Repository**: `https://github.com/rajinakhan80585-collab/Task_Track`
- **Frontend**: Coming soon in Sprint 2

---

## 🏗️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Render)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: CSS3

### Deployment
- **Platform**: Render
- **Database**: Render PostgreSQL
- **Version Control**: Git/GitHub

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  category_id INTEGER,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);
```

---

## 🚀 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Task Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Category Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | Yes |
| POST | `/api/categories` | Create category | Yes |
| PUT | `/api/categories/:id` | Update category | Yes |
| DELETE | `/api/categories/:id` | Delete category | Yes |

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (local or Render)
- Git
- Text editor (VS Code recommended)

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env


# Run database migration
npm run migrate

# Start development server
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Create React app (first time only)
npx create-react-app .

# Install dependencies
npm install axios react-router-dom

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start development server
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🌐 Deployment Guide

### See Complete Deployment Instructions
Refer to `RENDER_DEPLOYMENT_GUIDE.md` for detailed step-by-step deployment instructions.

### Quick Deployment Checklist
- [ ] Push code to GitHub
- [ ] Create PostgreSQL database on Render
- [ ] Deploy backend web service
- [ ] Add environment variables
- [ ] Run database migration
- [ ] Deploy frontend static site
- [ ] Update CORS settings
- [ ] Test all endpoints

---

## 🧪 Testing the API

### Using Postman/Thunder Client

#### 1. Register User
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Rajina",
  "email": "rajina@test.com",
  "password": "password123"
}
```

#### 2. Login
```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "rajina@test.com",
  "password": "password123"
}
```

Copy the token from response!

#### 3. Create Task
```json
POST http://localhost:5000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Complete Sprint 1",
  "description": "Finish all workshop milestones",
  "status": "In Progress",
  "due_date": "2026-02-10"
}
```

---

## 📁 Project Structure

```
task-track/
├── backend/
│   ├── db/
│   │   ├── connection.js      # PostgreSQL connection
│   │   └── migrate.js         # Database migration
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── tasks.js           # Task endpoints
│   │   └── categories.js      # Category endpoints
│   ├── .env.example           # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   ├── server.js              # Express server
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── FRONTEND_SETUP.md
│
├── RENDER_DEPLOYMENT_GUIDE.md
└── README.md
```

---

## ✨ Features Implemented

### Sprint 1 (Backend - Weeks 2-3)
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database integration
- ✅ User authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ CRUD operations for tasks
- ✅ CRUD operations for categories
- ✅ Protected routes with middleware
- ✅ Input validation
- ✅ Error handling
- ✅ Deployed to Render

### Sprint 2 (Frontend - Weeks 9-10)
- ⏳ React component structure
- ⏳ User registration/login forms
- ⏳ Dashboard with task list
- ⏳ Task creation/editing forms
- ⏳ Category management
- ⏳ State management
- ⏳ API integration

### Sprint 3 (Integration - Weeks 12-13)
- ⏳ Full frontend-backend integration
- ⏳ User authentication flow
- ⏳ Protected routes
- ⏳ Task filtering and search
- ⏳ Responsive design
- ⏳ Final deployment

---

## 🎓 Course Learning Outcomes Achieved

### CLO1: RESTful APIs
✅ Architected and developed scalable RESTful API using Node.js and Express

### CLO2: Data Persistence
✅ Implemented PostgreSQL database with proper relationships and migrations

### CLO3: Frontend Development
⏳ Building component-based SPA with React (Sprint 2)

### CLO4: Integration
⏳ Integrating frontend with backend API (Sprint 3)

### CLO5: Security
✅ Implemented JWT authentication and bcrypt password hashing

### CLO6: Deployment
✅ Deployed to Render with PostgreSQL database and CI/CD workflow

---

## 📸 Screenshots

### Backend API Response
![API Health Check](screenshots/api-health.png)

### Database Schema
![Database Tables](screenshots/database-schema.png)

### Render Dashboard
![Render Deployment](screenshots/render-dashboard.png)

---

## 🐛 Known Issues / Future Improvements

### Current Limitations
- Frontend not yet implemented (Sprint 2)
- No task filtering by status/category
- No pagination for task lists
- No search functionality

### Future Enhancements
- Add task due date reminders
- Implement task priority levels
- Add task comments/notes
- Enable task sharing between users
- Mobile app version
- Dark mode theme
- Email notifications

---

## 📝 Development Log

### Week 2 (Jan 15-19, 2026)
- Set up project structure
- Created Express server
- Configured PostgreSQL connection

### Week 3 (Jan 22-26, 2026)
- Implemented authentication system
- Built CRUD endpoints for tasks and categories
- Added JWT middleware
- Wrote database migrations

### Week 4 (Jan 29 - Feb 2, 2026)
- Deployed backend to Render
- Set up PostgreSQL database on Render
- Tested all API endpoints
- Prepared for Sprint 1 review

---

## 🤝 Contributing

This is a student project for PROG2500. No external contributions are accepted.

---

## 📄 License

This project is created for educational purposes as part of PROG2500 course at Conestoga College.

---

## 👤 Contact

**Rajina**  
Student Number: 9030748  
Email: [your-email@conestogac.on.ca]

---

## 🙏 Acknowledgments

- Professor Johan Prinz for course instruction
- Conestoga College PROG2500 course materials
- Render documentation and support
- PostgreSQL documentation

---

## 📚 Resources Used

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Render Documentation](https://render.com/docs)
- [React Documentation](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated**: February 7, 2026  
**Sprint**: 1 (Backend)  
**Status**: Deployed and Ready for Review ✅

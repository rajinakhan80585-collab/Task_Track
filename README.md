# Task Track - Full Stack Task Management Application

**Student**: Rajina  
**Student ID**: 9030748  
**Course**: PROG2500 - Open-Source Full Stack Development  
**Semester**: Winter 2026

---

## 📱 Overview

Task Track is a modern, full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. With an intuitive interface and powerful backend, users can create tasks, organize them by categories, set priorities, and track completion status.

### 🌐 Live Demo
- **Frontend**: [https://design-task-track.onrender.com](https://design-task-track.onrender.com)
- **Backend API**: [https://task-track-i2nd.onrender.com](https://task-track-i2nd.onrender.com)

### 📝 Demo Credentials
```
Email: rajina@example.com
Password: Abc@123
Mobile: +1-905-123-4567
```

---

## ✨ Key Features

✅ **User Authentication** - Secure registration & login with JWT tokens  
✅ **Task Management** - Create, edit, update, and delete tasks  
✅ **Task Priority** - Set priority levels (Low, Medium, High)  
✅ **Status Tracking** - Set task status (Pending, In Progress, Completed)  
✅ **Search & Filter** - Find tasks by title, filter by status, sort by various fields  
✅ **Categories** - Organize tasks into custom categories  
✅ **Due Dates** - Track task deadlines  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  
✅ **Error Handling** - Error boundary, 404 page, toast notifications  
✅ **Loading States** - Skeleton loaders and smooth transitions  
✅ **Protected Routes** - JWT-based route protection  
✅ **Clean, Modern UI** - Professional light-themed interface with smooth animations  

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **PostgreSQL** | Relational database |
| **JWT** | Secure authentication |
| **bcryptjs** | Password hashing |
| **express-validator** | Input validation |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **CSS3** | Styling & responsive design |
| **Fetch API** | HTTP requests |
| **React Hooks** | State management |

### Deployment
| Service | Purpose |
|---------|---------|
| **Render** | Cloud hosting (frontend & backend) |
| **PostgreSQL** | Cloud database |

---

## 📂 Project Structure

```
Task_Track/
├── src/                          # React frontend
│   ├── pages/
│   │   ├── LoginPage.js          # Login form
│   │   ├── RegisterPage.js       # Registration form
│   │   ├── DashboardPage.js      # Main dashboard
│   │   ├── NotFoundPage.js       # 404 page
│   │   └── ErrorBoundary.js      # Error handling
│   ├── components/
│   │   ├── TaskForm.js           # Task creation
│   │   ├── TaskList.js           # Task list container
│   │   ├── TaskCard.js           # Individual task card
│   │   ├── TaskFilterSort.js     # Search/filter controls
│   │   ├── Toast.js              # Notifications
│   │   ├── LoadingSpinner.js     # Loading states
│   │   └── CategorySelector.js   # Category picker
│   ├── services/
│   │   └── api.js                # API service layer
│   ├── App.js                    # Main app component
│   └── index.js                  # Entry point
├── backend/
│   ├── routes/
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── tasks.js              # Task CRUD operations
│   │   └── categories.js         # Category management
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── db/
│   │   ├── connection.js         # Database pool
│   │   ├── migrate.js            # Database schema
│   │   └── seed.js               # Demo data
│   └── server.js
├── package.json                  # Frontend dependencies
├── .env                          # Development environment
├── .env.example                  # Environment template
├── DEPLOYMENT_GUIDE.md           # Deployment instructions
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Local Development

#### 1. Clone the repository
```bash
git clone <repository-url>
cd Task_Track
```

#### 2. Install dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

#### 3. Setup environment variables
Create `.env` in backend directory:
```env
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### 4. Initialize database
```bash
cd backend
npm run migrate    # Create tables
npm run seed       # Add demo data
```

#### 5. Start both servers
```bash
# From root directory
npm run dev        # Starts frontend (3000) & backend (5000)
```

Visit `http://localhost:3000` and login with demo credentials above.

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  priority VARCHAR(20) DEFAULT 'Medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### Categories Table
```sql
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

---

## 🎨 Design & UI

- **Color Scheme**: Light blue (#5B8DEE) with clean backgrounds
- **Responsive**: Mobile-first design using flexbox and CSS Grid
- **Accessibility**: Semantic HTML, proper form labels, keyboard navigation

---

## 🧪 Testing Demo

1. Go to [https://design-task-track.onrender.com](https://design-task-track.onrender.com)
2. Click "Create Account" to register or use demo credentials
3. Create new tasks and manage them
4. Organize by category and track status
5. Update or delete tasks as needed

---

## 📚 Features Implemented

### Sprint 2 Requirements
- ✅ Full CRUD operations for tasks
- ✅ User authentication with registration
- ✅ Mobile field integration in registration
- ✅ Category management
- ✅ Professional UI with consistent styling
- ✅ Database seeding with demo data
- ✅ API endpoint documentation
- ✅ Production deployment on Render

---

## 🆕 Phase 2 Enhancements

### Task Management Improvements
- **Priority Levels**: Set Low, Medium, or High priority for tasks
- **Advanced Search**: Search tasks by title or description in real-time
- **Smart Filtering**: Filter tasks by status (All/Pending/In Progress/Completed)
- **Multiple Sort Options**: Sort by date, title, status, or due date
- **Inline Editing**: Edit task details directly from the task card

### User Experience Enhancements
- **Error Boundary**: Graceful error handling with recovery options
- **404 Page**: Custom 404 page for invalid routes
- **Loading Skeletons**: Beautiful loading states while data fetches
- **Toast Notifications**: User-friendly success and error messages
- **Protected Routes**: JWT-based route protection with proper redirects

### Code Quality Improvements
- **Comprehensive Comments**: Detailed JSDoc comments on all components
- **Semantic HTML**: Accessible markup with proper ARIA labels
- **Clean Code**: Removed console logs, dead code, and improved structure
- **Reusable Components**: Modular, well-organized component architecture
- **Error Handling**: Proper error boundaries and validation messages

### Developer Experience
- `.env.example` files for easy setup
- `DEPLOYMENT_GUIDE.md` for step-by-step deployment instructions
- Clear project structure and component organization
- Consistent code formatting and naming conventions

---

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Input validation on all endpoints
- CORS configured for frontend-backend communication
- SSL enabled for database connections
- Secure environment variable management

---

## 📞 Support & Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000
```

**Database Connection Error**
- Verify DATABASE_URL in .env
- Ensure PostgreSQL is running
- Check database credentials

**Frontend not loading**
- Clear browser cache
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env

**Build issues on Render**
- Check build logs in Render dashboard
- Verify environment variables are set correctly
- Ensure package.json includes correct start command

### Getting Help
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment issues
- Review browser console (F12) for client-side errors
- Check terminal output for server-side errors
- Verify database connection and migrations

---

## 📄 License

This project created for educational purposes as part of PROG2500 course.

---

**Last Updated**: March 2026  
**Author**: Rajina (9030748)  
**Course**: PROG2500 - Open-Source Full Stack Development


### Installation

```bash
# Clone and install
git clone <repo-url>
cd Task_Track
npm install
cd backend && npm install && cd ..

# Setup environment files
cp .env.example .env
cp backend/.env.example backend/.env

# Run migrations
cd backend && npm run migrate
```

### Start Development

```bash
# Run both frontend and backend
npm run dev

# Or separately:
npm start           # Frontend only
npm run dev-backend # Backend only
```

---

## 📊 Database Schema

### Users Table
- `user_id` (INT, PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `mobile` (VARCHAR)
- `password_hash` (VARCHAR)
- `created_at` (TIMESTAMP)

### Categories Table
- `category_id` (INT, PRIMARY KEY)
- `user_id` (INT, FK to users)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)

### Tasks Table
- `task_id` (INT, PRIMARY KEY)
- `user_id` (INT, FK to users)
- `category_id` (INT, FK to categories)
- `title` (VARCHAR)
- `description` (TEXT)
- `status` (VARCHAR)
- `priority` (VARCHAR)
- `due_date` (DATE)
- `created_at` (TIMESTAMP)

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register   - Register user
POST   /api/auth/login      - Login user
GET    /api/auth/profile    - Get profile (Protected)
```

### Tasks
```
GET    /api/tasks           - Get all tasks (Protected)
POST   /api/tasks           - Create task (Protected)
PUT    /api/tasks/:id       - Update task (Protected)
DELETE /api/tasks/:id       - Delete task (Protected)
```

### Categories
```
GET    /api/categories      - Get all categories (Protected)
POST   /api/categories      - Create category (Protected)
PUT    /api/categories/:id  - Update category (Protected)
DELETE /api/categories/:id  - Delete category (Protected)
```

---

## ✨ Features

✅ User registration with name and mobile field  
✅ JWT authentication with login  
✅ Task CRUD operations  
✅ Category management  
✅ Protected routes  
✅ Responsive UI  
✅ Clean, light design  
✅ Database migration script  
✅ Seed data support  

---

## 📸 Frontend Pages

- **Login** - Email, password, mobile field
- **Register** - Name, email, password, mobile field
- **Dashboard** - Task list, categories
- **Create Task** - Form with title, description, category, priority, due date
- **Task Card** - View, edit, delete tasks

---

## 🧪 Testing

Use Postman or Thunder Client to test endpoints. See [backend/README.md](./backend/README.md) for detailed testing examples.

---

## 📁 Project Structure

```
Task_Track/
├── backend/
│   ├── db/
│   │   ├── connection.js
│   │   ├── migrate.js
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── categories.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── README.md
│
├── src/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── DashboardPage.js
│   ├── components/
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── TaskCard.js
│   │   └── CategorySelector.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
│
├── .env
├── .env.example
├── .env.production
├── package.json
└── README.md
```

---


---

**Last Updated**: March 26, 2026  

# 🎯 SPRINT 1 QUICK REFERENCE CARD

## ⚡ Quick Start Commands

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Render database URL
npm run migrate
npm run dev
```

### Test API
```bash
curl http://localhost:5000
# Should return: {"success": true, "message": "Task Track API is running"}
```

---

## 🗄️ Render Database Setup (Copy-Paste Checklist)

1. **Create Database**
   - Dashboard → New + → PostgreSQL
   - Name: `tasktrack-db`
   - Region: Oregon (USA)
   - Plan: Free

2. **Copy Internal URL**
   - After creation → Connections section
   - Copy "Internal Database URL"
   - Format: `postgresql://user:pass@dpg-xxxxx/db`

3. **Save URL for Backend**
   - Use this in backend environment variables
   - ⚠️ Use INTERNAL not EXTERNAL for web service

---

## 🚀 Render Backend Deployment (Step-by-Step)

1. **Create Web Service**
   - New + → Web Service
   - Connect GitHub repo

2. **Configure Settings**
   ```
   Name: tasktrack-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```

3. **Add Environment Variables**
   ```
   DATABASE_URL = <paste internal URL from database>
   JWT_SECRET = your_super_secret_jwt_key_2026
   JWT_EXPIRE = 7d
   NODE_ENV = production
   PORT = 5000
   ```

4. **Deploy & Run Migration**
   - Wait for deployment to complete
   - Go to Shell tab
   - Run: `npm run migrate`
   - ✅ Should see success message

---

## 🧪 Testing Checklist

### 1. Health Check
```bash
GET http://localhost:5000/
# OR
GET https://your-backend.onrender.com/

Expected: 
{
  "success": true,
  "message": "Task Track API is running"
}
```

### 2. Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Rajina Test",
  "email": "test@example.com",
  "password": "password123"
}

Expected: 
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {...}
}
```

### 3. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

Expected: 
{
  "success": true,
  "token": "eyJhbGc..."
}
```

### 4. Create Task
```bash
POST /api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Test Task",
  "description": "Testing API",
  "status": "Pending"
}

Expected: 
{
  "success": true,
  "task": {...}
}
```

### 5. Get Tasks
```bash
GET /api/tasks
Authorization: Bearer YOUR_TOKEN_HERE

Expected: 
{
  "success": true,
  "count": 1,
  "tasks": [...]
}
```

---

## 📋 Pre-Demo Day Checklist

### Code Quality
- [ ] All files committed to Git
- [ ] 10+ descriptive commits
- [ ] No .env or node_modules in Git
- [ ] README.md completed
- [ ] Code is properly commented

### Deployment
- [ ] Database created on Render
- [ ] Backend deployed and running
- [ ] Migration completed successfully
- [ ] All endpoints tested and working
- [ ] Environment variables configured

### Documentation
- [ ] GitHub repository is public
- [ ] README has deployment URL
- [ ] Test credentials documented
- [ ] API endpoints documented

### Testing
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can create tasks
- [ ] Can retrieve tasks
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] Authentication works properly

---

## 🎤 Sprint Review Demo Script

### What to Show Professor

1. **GitHub Repository**
   - Show commit history (proves regular work)
   - Show code structure
   - Show README documentation

2. **Live Backend**
   - Open backend URL in browser
   - Show health check response
   - Explain it's deployed on Render

3. **Postman/Thunder Client**
   - Demo register endpoint
   - Demo login endpoint
   - Demo creating a task (with auth token)
   - Demo getting tasks list

4. **Code Walkthrough** (Be ready to show):
   - `server.js` - "Here's my Express server setup"
   - `db/connection.js` - "Here's my PostgreSQL connection"
   - `routes/auth.js` - "Here's my authentication logic"
   - `routes/tasks.js` - "Here's my task CRUD operations"
   - `middleware/auth.js` - "Here's my JWT middleware"

5. **Database**
   - Show Render dashboard
   - Show database is running
   - Mention migration was successful

### Questions You Might Get Asked

**Q: "Where are your routes defined?"**
A: "In the routes folder - auth.js for authentication, tasks.js for task operations, and categories.js for category management."

**Q: "How are you handling authentication?"**
A: "I'm using JWT tokens. When a user logs in, I generate a token that they include in the Authorization header for protected routes."

**Q: "Show me your database connection"**
A: "Here in db/connection.js, I'm using pg (node-postgres) with a connection pool to my Render PostgreSQL database."

**Q: "How did you deploy this?"**
A: "I deployed to Render by connecting my GitHub repository, setting up environment variables, and running the migration script."

---

## 🐛 Common Issues & Quick Fixes

### "Cannot connect to database"
```bash
# Check .env has correct DATABASE_URL
# Use INTERNAL URL, not EXTERNAL
# Format: postgresql://user:pass@host:port/db
```

### "JWT must be provided"
```bash
# Add token to request header:
Authorization: Bearer YOUR_TOKEN_HERE
```

### "Service unavailable"
```bash
# Check Render logs
# Verify all env variables are set
# Check if service is sleeping (free tier)
```

### "Migration failed"
```bash
# In Render Shell:
npm run migrate

# Or locally with external URL:
# Update .env with EXTERNAL URL temporarily
npm run migrate
# Change back to INTERNAL URL
```

---

## 📱 Quick Contact Commands

### Open Backend URL
```bash
# Local
http://localhost:5000

# Production
https://your-backend.onrender.com
```

### View Logs
```bash
# In Render dashboard:
Your Service → Logs tab
```

### Run Migration
```bash
# In Render dashboard:
Your Service → Shell tab → npm run migrate
```

---

## 🎯 Rubric Focus Points

### Deployment & Integrity (10 points)
- ✅ Deployed to live URL (Render)
- ✅ Accessible online
- ✅ Regular Git commits with good messages

### Sprint Completion (40 points)
- ✅ All backend milestones complete
- ✅ Authentication working
- ✅ CRUD operations for tasks
- ✅ Database integration
- ✅ Code runs without errors

### Technical Understanding (30 points)
- ✅ Can navigate own code
- ✅ Can explain how it works
- ✅ Can answer technical questions
- ✅ Understand REST API design
- ✅ Understand database relationships

### Lab Participation (20 points)
- ✅ Attended workshops
- ✅ Present for Sprint Review

---

## 💾 Submission File Template

Create `submission.txt`:

```
PROG2500 - Sprint 1 Submission
==============================

Student Information
-------------------
Name: Rajina
Student Number: 9030748
Date: February 7, 2026

Repository & Deployment
-----------------------
GitHub: https://github.com/YOUR-USERNAME/task-track
Live Backend: https://tasktrack-backend.onrender.com

Test Credentials
----------------
Email: rajina@test.com
Password: password123

Features Completed
------------------
✅ RESTful API with Express
✅ PostgreSQL database on Render
✅ User authentication with JWT
✅ Password hashing with bcrypt
✅ CRUD operations for tasks
✅ CRUD operations for categories
✅ Protected routes with middleware
✅ Input validation
✅ Error handling
✅ Database migrations
✅ Deployed and accessible online

Technical Stack
---------------
- Backend: Node.js + Express
- Database: PostgreSQL (Render)
- Authentication: JWT
- Deployment: Render
- Version Control: Git/GitHub

Ready for Sprint Review Demo!
```

---

## 🚀 You Got This!

Remember:
- **Stay calm** during the demo
- **Show your work** confidently
- **Explain clearly** what you built
- **Be proud** of your progress

**Good luck, Rajina! 🎉**

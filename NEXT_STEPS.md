# 🎯 NEXT STEPS - Complete Setup in 30 Minutes

## Overview
Your Task Track project structure is ready! Follow these steps to get everything running.

---

## ⏱️ STEP-BY-STEP SETUP (30 minutes)

### Phase 1: Local Backend Setup (10 minutes)

#### 1. Install Dependencies
```bash
cd backend
npm install
```
This will install: express, pg, dotenv, bcryptjs, jsonwebtoken, cors, express-validator

#### 2. Create Your .env File
```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` with these values:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/tasktrack
JWT_SECRET=rajina_secret_key_2026_tasktrack
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**For now, use a placeholder DATABASE_URL. We'll update it with Render's URL later.**

#### 3. Test Backend Locally (Optional)
```bash
# Start server
npm run dev

# In another terminal, test it
curl http://localhost:5000
```

---

### Phase 2: Deploy to Render (15 minutes)

#### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub
- Authorize Render to access your repositories

#### 2. Create PostgreSQL Database
1. Click **"New +"** → **"PostgreSQL"**
2. Settings:
   - Name: `tasktrack-db`
   - Database: `tasktrack`
   - Region: Oregon (USA)
   - Plan: **Free**
3. Click **"Create Database"**
4. Wait 2-3 minutes for creation
5. **Copy the INTERNAL Database URL** (in Connections section)
   - It looks like: `postgresql://tasktrack_user:xxx@dpg-xxx/tasktrack`
   - 📋 Save this! You'll need it multiple times

#### 3. Push Code to GitHub
```bash
# In project root
git init
git add .
git commit -m "Initial commit: Task Track with PostgreSQL"

# Create repo on GitHub (manually or via CLI)
# Then:
git remote add origin https://github.com/YOUR-USERNAME/task-track.git
git branch -M main
git push -u origin main
```

#### 4. Create Web Service on Render
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** → Select your `task-track` repo
3. Configure:
   ```
   Name: tasktrack-backend
   Region: Oregon (USA)
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```

#### 5. Add Environment Variables
Click **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste your INTERNAL database URL |
| `JWT_SECRET` | `rajina_secret_key_2026_tasktrack` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `CLIENT_URL` | `https://tasktrack-frontend.onrender.com` |

Click **"Create Web Service"** and wait 5-10 minutes for deployment.

#### 6. Run Database Migration
Once deployed:
1. Go to your web service dashboard
2. Click **"Shell"** tab
3. Type: `npm run migrate`
4. Press Enter
5. Wait for: "✅ Database migration completed successfully!"

---

### Phase 3: Test Your API (5 minutes)

#### 1. Test Health Check
Open in browser:
```
https://tasktrack-backend.onrender.com/
```

Should see:
```json
{
  "success": true,
  "message": "Task Track API is running"
}
```

#### 2. Test with Postman/Thunder Client

**Register User:**
```
POST https://tasktrack-backend.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "Rajina",
  "email": "rajina@test.com",
  "password": "password123"
}
```

**Login:**
```
POST https://tasktrack-backend.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "rajina@test.com",
  "password": "password123"
}
```

Copy the token from response!

**Create Task:**
```
POST https://tasktrack-backend.onrender.com/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Complete Sprint 1",
  "description": "Finish backend deployment",
  "status": "In Progress"
}
```

---

## 🎓 SPRINT 1 SUBMISSION

### What to Submit to Brightspace

Create a file called `submission.txt`:

```
PROG2500 - Sprint 1 Bundle Submission
=====================================

Student: Rajina
Student Number: 9030748
Date: February 7, 2026

GitHub Repository
-----------------
https://github.com/YOUR-USERNAME/task-track

Live Deployment
---------------
Backend API: https://tasktrack-backend.onrender.com
Database: PostgreSQL on Render (Internal)

Test Credentials
----------------
Email: rajina@test.com
Password: password123

Features Completed
------------------
✅ Express.js RESTful API
✅ PostgreSQL database with migrations
✅ User registration and authentication
✅ JWT token-based security
✅ Password hashing with bcrypt
✅ CRUD operations for tasks
✅ CRUD operations for categories
✅ Protected routes with middleware
✅ Input validation
✅ Error handling
✅ Deployed to Render
✅ Regular Git commits (10+)

API Endpoints Implemented
--------------------------
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
GET  /api/tasks
GET  /api/tasks/:id
POST /api/tasks
PUT  /api/tasks/:id
DELETE /api/tasks/:id
GET  /api/categories
POST /api/categories
PUT  /api/categories/:id
DELETE /api/categories/:id

Notes
-----
All backend requirements completed for Sprint 1.
Ready for live code review demonstration.
Frontend will be implemented in Sprint 2.
```

Upload this file to the Sprint 1 submission folder on Brightspace.

---

## 🎤 DEMO DAY PREPARATION

### What to Have Ready

1. **Laptop with browser open to:**
   - Your GitHub repository
   - Your live backend URL
   - Postman/Thunder Client with saved requests

2. **Be Ready to Show:**
   - Your commit history (proves regular work)
   - Your code structure (in VS Code or GitHub)
   - Live API testing (registration → login → create task)

3. **Be Ready to Answer:**
   - "Where are your routes defined?" → Show `routes/` folder
   - "How does authentication work?" → Explain JWT middleware
   - "Show me your database connection" → Show `db/connection.js`
   - "What database are you using?" → PostgreSQL on Render

### Demo Script (2-3 minutes)

1. **Show GitHub**
   - "Here's my repository with 10+ commits showing my development progress"
   - Show commit history

2. **Show Live Backend**
   - Open backend URL in browser
   - "This is my deployed API running on Render"
   - Show JSON response

3. **Show API Testing**
   - Open Postman/Thunder Client
   - Register a new user → Show success response
   - Login → Show token
   - Create a task with token → Show success

4. **Code Walkthrough**
   - Open VS Code
   - "Here's my server.js with Express setup"
   - "Here's my PostgreSQL connection"
   - "Here's my authentication routes with JWT"
   - "Here's my task CRUD operations"

---

## 📋 PRE-DEMO CHECKLIST

### 24 Hours Before Demo

- [ ] Backend is deployed and running on Render
- [ ] Database migration completed successfully
- [ ] All API endpoints tested and working
- [ ] At least 10-15 Git commits pushed
- [ ] README.md updated with deployment URLs
- [ ] submission.txt file created
- [ ] Test credentials documented

### 1 Hour Before Demo

- [ ] Laptop fully charged
- [ ] Browser open to GitHub repo
- [ ] Browser open to live backend URL
- [ ] Postman/Thunder Client open with saved requests
- [ ] VS Code open to project
- [ ] Can answer "Show me where your routes are defined"
- [ ] Can explain JWT authentication
- [ ] Feel confident and ready!

---

## 🆘 TROUBLESHOOTING

### Backend Won't Start Locally
```bash
# Check if dependencies installed
cd backend
npm install

# Check .env file exists
ls -la .env

# Check Node version
node --version  # Should be 18+
```

### Can't Connect to Database
```bash
# Verify DATABASE_URL format:
postgresql://username:password@host:port/database

# Use INTERNAL URL for Render web service
# Use EXTERNAL URL only for local connection
```

### Render Deployment Failed
1. Check Render logs for error messages
2. Verify all environment variables are set
3. Ensure `npm install` completed successfully
4. Check that `server.js` is in backend root

### Migration Failed
```bash
# In Render Shell:
npm run migrate

# Check database connection in logs
# Verify DATABASE_URL is correct
```

---

## 🎯 SUCCESS CRITERIA

You're ready for Sprint 1 review when:

✅ Backend API is live and accessible online  
✅ Can register a new user via API  
✅ Can login and receive JWT token  
✅ Can create tasks with authentication  
✅ Can retrieve, update, delete tasks  
✅ Database is running on Render  
✅ Code is on GitHub with regular commits  
✅ README documents everything clearly  

---

## 📞 NEED HELP?

### During Setup
- Review `RENDER_DEPLOYMENT_GUIDE.md` for detailed steps
- Check `QUICK_REFERENCE.md` for commands
- Review `GIT_SETUP_GUIDE.md` for Git help

### Before Demo
- Test all endpoints one more time
- Review your code structure
- Practice your 2-minute demo script

### During Demo
- Stay calm and confident
- Explain what you built clearly
- Show your working deployment

---

## 🎉 YOU'VE GOT THIS!

Your project structure is complete and professional. Just follow these steps, test everything, and you'll ace Sprint 1!

**Remember:**
- Start early (don't wait until last minute)
- Test as you go
- Commit regularly
- Ask for help if stuck

**Good luck, Rajina! 🚀**

---

**Time Budget:**
- Setup: 30 minutes
- Testing: 15 minutes
- Documentation: 15 minutes
- **Total: 1 hour to complete Sprint 1**

**You can do this! 💪**

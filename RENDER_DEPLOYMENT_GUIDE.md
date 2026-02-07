# 🚀 RENDER DEPLOYMENT GUIDE - Task Track

This guide will walk you through deploying your Task Track application to Render with PostgreSQL database.

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- Your code pushed to a GitHub repository

---

## STEP 1: Create PostgreSQL Database on Render

### 1.1 Login to Render Dashboard
Go to https://dashboard.render.com

### 1.2 Create New PostgreSQL Database
1. Click **"New +"** button in the top right
2. Select **"PostgreSQL"**
3. Fill in the database details:
   - **Name**: `tasktrack-db` (or any name you prefer)
   - **Database**: `tasktrack` (this will be your database name)
   - **User**: `tasktrack_user` (this will be auto-generated)
   - **Region**: Choose closest to you (e.g., Oregon USA)
   - **PostgreSQL Version**: 16 (latest)
   - **Plan**: **Free** (for development)

4. Click **"Create Database"**

### 1.3 Get Database Connection Details
After creation, you'll see the database dashboard. You need to copy the **INTERNAL DATABASE URL**:

1. Scroll down to **"Connections"** section
2. Find **"Internal Database URL"** (NOT External!)
3. Click **"Copy"** button - it will look like:
   ```
   postgresql://tasktrack_user:password@dpg-xxxxxxxxxxxxx/tasktrack
   ```
4. **SAVE THIS URL** - you'll need it for your backend!

### 1.4 Important Notes About Database URLs
- **Internal URL**: Use this for your web service (faster, free)
- **External URL**: Only for connecting from your local computer
- The internal URL format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

---

## STEP 2: Deploy Backend (Web Service) on Render

### 2.1 Create New Web Service
1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Click **"Connect GitHub"**
   - Authorize Render to access your repositories
   - Select your `task-track` repository

### 2.2 Configure Web Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `tasktrack-backend` (this will be in your URL)
- **Region**: Same as database (e.g., Oregon USA)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` (because your backend code is in backend folder)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Instance Type:**
- Select **"Free"** plan

### 2.3 Add Environment Variables
Scroll down to **"Environment Variables"** section and add:

Click **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste your INTERNAL database URL from Step 1.3 |
| `JWT_SECRET` | `your_super_secret_jwt_key_2026_rajina` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `CLIENT_URL` | Leave blank for now (add frontend URL later) |

### 2.4 Deploy Backend
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. You'll see build logs - watch for success messages
4. Once deployed, you'll get a URL like: `https://tasktrack-backend.onrender.com`

### 2.5 Test Your Backend
Open your backend URL in browser:
```
https://tasktrack-backend.onrender.com
```

You should see:
```json
{
  "success": true,
  "message": "Task Track API is running",
  "timestamp": "2026-02-07T..."
}
```

---

## STEP 3: Run Database Migration

### Option A: Using Render Shell (Recommended)
1. Go to your web service dashboard
2. Click **"Shell"** tab
3. Run the migration command:
   ```bash
   npm run migrate
   ```
4. Wait for success message: "✅ Database migration completed successfully!"

### Option B: Using Local Terminal
1. Copy your **EXTERNAL database URL** from Render
2. In your local `.env` file, temporarily use the external URL
3. Run: `npm run migrate`
4. Change back to internal URL in Render environment variables

---

## STEP 4: Test Your API Endpoints

### Test Registration Endpoint
Use Postman, Thunder Client, or curl:

```bash
curl -X POST https://tasktrack-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajina",
    "email": "rajina@test.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Rajina",
    "email": "rajina@test.com"
  }
}
```

### Test Login Endpoint
```bash
curl -X POST https://tasktrack-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rajina@test.com",
    "password": "password123"
  }'
```

---

## STEP 5: Frontend Deployment (React)

### 5.1 Update Frontend API URL
In your React frontend, create a `.env` file:
```env
REACT_APP_API_URL=https://tasktrack-backend.onrender.com
```

Update your API calls to use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### 5.2 Deploy Frontend to Render
1. Click **"New +"** > **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `tasktrack-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://tasktrack-backend.onrender.com`
5. Click **"Create Static Site"**

### 5.3 Update Backend CORS
Go back to your backend web service:
1. Go to **Environment** tab
2. Update `CLIENT_URL`:
   - Value: `https://tasktrack-frontend.onrender.com`
3. Save changes (backend will redeploy)

---

## STEP 6: Verify Everything Works

### Backend Health Check
```
https://tasktrack-backend.onrender.com/
```
Should show: "Task Track API is running"

### Test Complete Flow
1. Open your frontend URL
2. Register a new user
3. Login
4. Create a task
5. View tasks list

---

## 🎯 IMPORTANT RENDER TIPS

### Free Tier Limitations
- **Web services sleep after 15 minutes** of inactivity
- First request after sleep takes 50+ seconds to wake up
- Database has **90-day expiration** on free tier
- **Solution**: Upgrade to paid plan ($7/month) for always-on service

### Keeping Free Service Awake (Optional)
Use a service like **UptimeRobot** or **Cron-Job.org** to ping your backend every 14 minutes:
```
https://tasktrack-backend.onrender.com/
```

### Database Backup (Important!)
Render free databases expire after 90 days. Before expiration:
1. Export your data
2. Create a new database
3. Update DATABASE_URL
4. Import data

### Monitoring Your Deployment
- **Logs**: Check "Logs" tab for errors
- **Metrics**: Monitor response times
- **Events**: Track deployments and builds

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue 1: "Cannot connect to database"
**Solution**: 
- Verify you're using the INTERNAL database URL
- Check database is running in Render dashboard
- Ensure DATABASE_URL environment variable is set correctly

### Issue 2: "Application error" or "Service Unavailable"
**Solution**:
- Check Logs tab for error messages
- Verify all environment variables are set
- Make sure `npm install` completed successfully
- Check that `server.js` is in the root of backend directory

### Issue 3: "JWT must be provided"
**Solution**:
- Ensure JWT_SECRET is set in environment variables
- Check frontend is sending token in Authorization header
- Verify token format: `Bearer YOUR_TOKEN`

### Issue 4: CORS errors in frontend
**Solution**:
- Update CLIENT_URL in backend environment variables
- Ensure frontend is making requests to correct backend URL
- Check CORS settings in `server.js`

### Issue 5: Database migration fails
**Solution**:
- Use Render Shell to run migration directly
- Check database connection in Logs
- Verify PostgreSQL service is active
- Try running migration from local machine using EXTERNAL url

---

## 📝 CHECKLIST FOR DEPLOYMENT

### Backend Checklist
- [ ] PostgreSQL database created on Render
- [ ] Internal database URL copied
- [ ] Web service created and connected to GitHub
- [ ] All environment variables added
- [ ] Backend successfully deployed
- [ ] Database migration completed
- [ ] API endpoints tested and working

### Frontend Checklist
- [ ] REACT_APP_API_URL updated
- [ ] Static site created on Render
- [ ] Frontend deployed successfully
- [ ] Can register/login from frontend
- [ ] Can create/view tasks
- [ ] Backend CORS updated with frontend URL

---

## 🎓 SUBMISSION CHECKLIST FOR PROF. JOHAN

For your Sprint 1 submission, provide:

1. **GitHub Repository URL**
2. **Live Backend URL**: `https://tasktrack-backend.onrender.com`
3. **Live Frontend URL**: `https://tasktrack-frontend.onrender.com` (if completed)
4. **Test Credentials**:
   - Email: rajina@test.com
   - Password: password123
5. **Screenshots showing**:
   - Render dashboard with both services
   - Database connection info
   - API test results (Postman/Thunder)
   - Working frontend (if completed)

---

## 🆘 NEED HELP?

- **Render Documentation**: https://render.com/docs
- **PostgreSQL Docs**: https://render.com/docs/databases
- **Node.js Deployment**: https://render.com/docs/deploy-node-express-app

---

## ✅ FINAL NOTES

- Your backend URL: `https://[your-service-name].onrender.com`
- Test all endpoints before demo
- Keep database URL secret (never commit to Git)
- Make regular commits showing development progress
- Be ready to explain your code structure in Sprint Review

**Good luck with your deployment, Rajina! 🚀**

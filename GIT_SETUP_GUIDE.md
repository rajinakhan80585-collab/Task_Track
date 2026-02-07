# 🚀 Git & GitHub Setup Guide

## Step 1: Initialize Git Repository

```bash
# Navigate to your project root
cd ""

# Initialize git
git init

# Create .gitignore file (already exists)
```

## Step 2: Create .gitignore

Create a `.gitignore` file in the root directory:

```
# Node modules
node_modules/
backend/node_modules/
frontend/node_modules/

# Environment variables
.env
backend/.env
frontend/.env

# Build outputs
frontend/build/
frontend/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
temp/
```

## Step 3: Make First Commit

```bash
# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Task Track project setup with PostgreSQL"
```

## Step 4: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to https://github.com
2. Click "+" in top right > "New repository"
3. Repository name: `task-track`
4. Description: "Task Track - Full Stack Task Management App (PROG2500)"
5. Keep it **Public** (required for Sprint Review)
6. **DON'T** initialize with README (you already have one)
7. Click "Create repository"

### Option B: Via GitHub CLI (if installed)
```bash
gh repo create task-track --public --source=. --remote=origin
```

## Step 5: Connect Local to GitHub

```bash
# Add remote repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/task-track.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 6: Regular Commit Workflow

### When Making Changes

```bash
# Check status
git status

# Add specific files
git add backend/routes/tasks.js

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "Add task update endpoint with validation"

# Push to GitHub
git push
```

### Good Commit Messages Examples
```bash
git commit -m "Set up Express server and database connection"
git commit -m "Implement user authentication with JWT"
git commit -m "Add CRUD operations for tasks"
git commit -m "Create database migration script"
git commit -m "Add input validation to auth routes"
git commit -m "Update README with deployment instructions"
git commit -m "Fix CORS configuration for production"
```

## Step 7: Show Regular Development Activity

**IMPORTANT FOR GRADING**: The rubric checks for "healthy history of regular commits"

### Bad (will lose points):
```bash
# One massive commit with everything
git commit -m "Added everything"
```

### Good (full points):
```bash
# Multiple commits showing development progression
git commit -m "Initialize project structure"
# ... work on database ...
git commit -m "Set up PostgreSQL connection and schema"
# ... work on auth ...
git commit -m "Implement user registration endpoint"
# ... work on tasks ...
git commit -m "Add task creation and retrieval endpoints"
# ... continue working ...
git commit -m "Add authentication middleware"
```

## Step 8: Commit Strategy for This Project

### Week 2-3 (Backend Development)
Aim for 10-15 commits showing progression:

```bash
# Day 1
git commit -m "Initialize backend with Express and PostgreSQL"
git commit -m "Create database connection module"
git commit -m "Add user table migration"

# Day 2
git commit -m "Implement user registration endpoint"
git commit -m "Add password hashing with bcryptjs"
git commit -m "Create login endpoint with JWT"

# Day 3
git commit -m "Set up authentication middleware"
git commit -m "Add tasks table migration"
git commit -m "Implement task CRUD endpoints"

# Day 4
git commit -m "Add categories table and endpoints"
git commit -m "Implement input validation"
git commit -m "Add error handling middleware"

# Day 5
git commit -m "Update README with API documentation"
git commit -m "Prepare for Render deployment"
git commit -m "Add deployment configuration"
```

## Step 9: GitHub Repository Settings

### Update Repository Description
1. Go to your repository on GitHub
2. Click "⚙️" (Settings) next to About
3. Add description: "Full Stack Task Management App - PROG2500 Winter 2026"
4. Add topics: `nodejs`, `express`, `postgresql`, `react`, `fullstack`, `render`
5. Save changes

### Add README Badge (Optional but Cool)
Add to top of README.md:
```markdown
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)
```

## Step 10: Verify Everything

```bash
# Check that files are committed
git status

# View commit history
git log --oneline

# Check remote connection
git remote -v

# Push any remaining changes
git push
```

## Common Git Commands Reference

```bash
# View status
git status

# Add files
git add <file>          # Add specific file
git add .               # Add all changes

# Commit
git commit -m "message" # Commit with message
git commit -am "message" # Add and commit (tracked files only)

# Push
git push                # Push to current branch
git push origin main    # Push to main branch

# Pull latest changes
git pull

# View history
git log                 # Full history
git log --oneline       # Compact history

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard uncommitted changes
git checkout -- <file>

# Create branch
git branch feature-name
git checkout feature-name

# Or create and switch in one command
git checkout -b feature-name
```

## Troubleshooting

### Issue: "fatal: not a git repository"
```bash
# Solution: Initialize git
git init
```

### Issue: "remote origin already exists"
```bash
# Solution: Remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/task-track.git
```

### Issue: "failed to push some refs"
```bash
# Solution: Pull first, then push
git pull origin main --allow-unrelated-histories
git push origin main
```

### Issue: Can't push because of large files
```bash
# Solution: Check what's large
git ls-files -s | sort -k4 -n

# If node_modules got committed accidentally
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

## Pre-Submission Checklist

Before submitting your Sprint 1 Bundle:

- [ ] All code is committed to Git
- [ ] At least 10-15 commits showing development progression
- [ ] Commit messages are descriptive
- [ ] No node_modules or .env files in Git
- [ ] README.md is up to date
- [ ] Repository is public on GitHub
- [ ] Backend is deployed to Render
- [ ] Repository URL is ready to submit

## What Professor Will Check

### ✅ Good Repository (Excellent Grade)
- Public GitHub repository
- 10+ meaningful commits over development period
- Clear commit messages explaining changes
- No massive "dump everything" commits
- .gitignore properly configured
- Descriptive README
- Clean commit history

### ❌ Bad Repository (Points Deducted)
- Only 1-2 massive commits
- Generic commit messages ("update", "changes", "fix")
- node_modules or .env in repository
- Missing README or documentation
- Suspicious git history (all commits in one day)

## Submission Format

When submitting to Brightspace:

Create a text file: `submission.txt`

```
Student Name: Rajina
Student Number: 9030748
Course: PROG2500-26W-Sec1

GitHub Repository: https://github.com/YOUR-USERNAME/task-track
Live Backend URL: https://tasktrack-backend.onrender.com
Live Frontend URL: (Not yet deployed - Sprint 2)

Test Credentials:
Email: rajina@test.com
Password: password123

Notes:
- All Sprint 1 backend features completed
- Database deployed to Render PostgreSQL
- API endpoints tested and working
- Ready for live code review
```

---

**Remember**: Git commits are like save points in a video game - commit often, commit with purpose! 🎮

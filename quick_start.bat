@echo off
echo 🚀 Library Management System - Quick Start
echo ==========================================

echo.
echo 📋 Step 1: Fixing database...
python fix_database.py

echo.
echo 📋 Step 2: Installing backend dependencies...
cd backend
pip install -r requirements.txt

echo.
echo 📋 Step 3: Starting backend server...
start "Backend Server" cmd /k "echo Backend starting... && python app.py"

echo.
echo 📋 Step 4: Installing frontend dependencies...
cd ..\frontend
call npm install

echo.
echo 📋 Step 5: Starting frontend server...
start "Frontend Server" cmd /k "echo Frontend starting... && npm start"

echo.
echo ✅ System is starting up!
echo.
echo 🌐 Frontend will open at: http://localhost:3000
echo 🔧 Backend API running at: http://localhost:5000
echo 👤 Login credentials: admin / admin123
echo.
echo ⏳ Please wait for both servers to start...
pause
@echo off
echo 🚀 Starting Library Management System
echo =====================================

echo.
echo 📋 Step 1: Testing connections...
python test_connection.py

echo.
echo 📋 Step 2: Starting Backend Server...
cd backend
start "Backend Server" cmd /k "python app.py"

echo.
echo 📋 Step 3: Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 📋 Step 4: Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo ✅ System started successfully!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 👤 Login: admin / admin123
echo.
pause
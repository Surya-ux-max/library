@echo off
echo 🚀 Starting Simple Backend (No Database Required)
echo ================================================

cd backend

echo 📦 Installing basic dependencies...
pip install flask flask-cors

echo 🌐 Starting simple Flask server...
python simple_app.py

pause
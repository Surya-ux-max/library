@echo off
echo 🚀 Starting Backend Server
echo ========================

cd backend

echo 📦 Installing dependencies...
pip install flask flask-sqlalchemy flask-cors flask-bcrypt flask-jwt-extended pymysql python-dotenv

echo 🗄️ Setting up database...
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS library_db;"
mysql -u root -proot library_db < database_setup.sql

echo 🌐 Starting Flask server...
python app.py

pause
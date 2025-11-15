@echo off
echo 🗄️ Setting up MySQL Database
echo ============================

echo 📋 Step 1: Creating database...
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS library_db;"

echo 📋 Step 2: Running database setup script...
mysql -u root -proot library_db < backend\database_setup.sql

echo 📋 Step 3: Verifying database...
mysql -u root -proot library_db -e "SHOW TABLES; SELECT COUNT(*) as books FROM book; SELECT COUNT(*) as members FROM member;"

echo ✅ Database setup complete!
pause
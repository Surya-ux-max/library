#!/usr/bin/env python3
"""
Test script to verify database connection and API endpoints
"""
import requests
import json
import mysql.connector
from mysql.connector import Error

def test_database_connection():
    """Test direct MySQL database connection"""
    print("🔍 Testing MySQL Database Connection...")
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='library_db',
            user='root',
            password='root'
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("SELECT DATABASE();")
            db_name = cursor.fetchone()
            print(f"✅ Connected to MySQL database: {db_name[0]}")
            
            # Test tables
            cursor.execute("SHOW TABLES;")
            tables = cursor.fetchall()
            print(f"📋 Tables found: {[table[0] for table in tables]}")
            
            # Test sample data
            cursor.execute("SELECT COUNT(*) FROM book;")
            book_count = cursor.fetchone()[0]
            cursor.execute("SELECT COUNT(*) FROM member;")
            member_count = cursor.fetchone()[0]
            
            print(f"📚 Books in database: {book_count}")
            print(f"👥 Members in database: {member_count}")
            
            return True
            
    except Error as e:
        print(f"❌ Database connection failed: {e}")
        return False
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()

def test_backend_api():
    """Test Flask backend API endpoints"""
    print("\n🔍 Testing Flask Backend API...")
    
    base_url = "http://localhost:5000/api"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend health check: {data['status']}")
            print(f"🗄️ Database status: {data['database']}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend not reachable: {e}")
        return False
    
    # Test login
    try:
        login_data = {"username": "admin", "password": "admin123"}
        response = requests.post(f"{base_url}/login", json=login_data, timeout=5)
        
        if response.status_code == 200:
            token = response.json()['access_token']
            print("✅ Login successful, token received")
            
            # Test protected endpoints
            headers = {"Authorization": f"Bearer {token}"}
            
            # Test books endpoint
            response = requests.get(f"{base_url}/books", headers=headers, timeout=5)
            if response.status_code == 200:
                books = response.json()
                print(f"✅ Books API working: {len(books)} books loaded")
            
            # Test members endpoint
            response = requests.get(f"{base_url}/members", headers=headers, timeout=5)
            if response.status_code == 200:
                members = response.json()
                print(f"✅ Members API working: {len(members)} members loaded")
            
            # Test dashboard endpoint
            response = requests.get(f"{base_url}/dashboard", headers=headers, timeout=5)
            if response.status_code == 200:
                stats = response.json()
                print(f"✅ Dashboard API working: {stats}")
            
            return True
        else:
            print(f"❌ Login failed: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API test failed: {e}")
        return False

def main():
    print("🚀 Library Management System - Connection Test")
    print("=" * 50)
    
    db_ok = test_database_connection()
    api_ok = test_backend_api()
    
    print("\n" + "=" * 50)
    if db_ok and api_ok:
        print("🎉 All tests passed! System is ready to use.")
        print("\n📋 Next steps:")
        print("1. Start backend: cd backend && python app.py")
        print("2. Start frontend: cd frontend && npm start")
        print("3. Open browser: http://localhost:3000")
    else:
        print("❌ Some tests failed. Please check the issues above.")

if __name__ == "__main__":
    main()
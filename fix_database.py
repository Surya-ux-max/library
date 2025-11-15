#!/usr/bin/env python3
"""
Database fix script - Creates tables and adds sample data
"""
import mysql.connector
from mysql.connector import Error

def fix_database():
    print("🔧 Fixing Library Management Database...")
    
    try:
        # Connect to MySQL
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='root'
        )
        
        cursor = connection.cursor()
        
        # Create database if not exists
        cursor.execute("CREATE DATABASE IF NOT EXISTS library_db")
        cursor.execute("USE library_db")
        print("✅ Database created/selected")
        
        # Create tables
        tables = {
            'book': """
                CREATE TABLE IF NOT EXISTS book (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(200) NOT NULL,
                    author VARCHAR(100) NOT NULL,
                    category VARCHAR(50) NOT NULL,
                    available BOOLEAN DEFAULT TRUE
                )
            """,
            'member': """
                CREATE TABLE IF NOT EXISTS member (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(120) UNIQUE NOT NULL,
                    phone VARCHAR(15) NOT NULL,
                    active BOOLEAN DEFAULT TRUE
                )
            """,
            'admin': """
                CREATE TABLE IF NOT EXISTS admin (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(80) UNIQUE NOT NULL,
                    password_hash VARCHAR(128) NOT NULL
                )
            """,
            'transaction': """
                CREATE TABLE IF NOT EXISTS transaction (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    book_id INT NOT NULL,
                    member_id INT NOT NULL,
                    issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    return_date DATETIME NULL,
                    fine DECIMAL(10,2) DEFAULT 0.00,
                    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
                    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
                )
            """
        }
        
        for table_name, query in tables.items():
            cursor.execute(query)
            print(f"✅ Table '{table_name}' created")
        
        # Insert sample data
        
        # Books
        cursor.execute("SELECT COUNT(*) FROM book")
        if cursor.fetchone()[0] == 0:
            books = [
                ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction'),
                ('To Kill a Mockingbird', 'Harper Lee', 'Fiction'),
                ('1984', 'George Orwell', 'Fiction'),
                ('Pride and Prejudice', 'Jane Austen', 'Romance'),
                ('Harry Potter', 'J.K. Rowling', 'Fantasy'),
                ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy'),
                ('Dune', 'Frank Herbert', 'Science'),
                ('Sapiens', 'Yuval Noah Harari', 'Non-Fiction'),
                ('Clean Code', 'Robert Martin', 'Technology'),
                ('The Alchemist', 'Paulo Coelho', 'Fiction')
            ]
            
            cursor.executemany(
                "INSERT INTO book (title, author, category) VALUES (%s, %s, %s)",
                books
            )
            print(f"✅ Added {len(books)} sample books")
        
        # Members
        cursor.execute("SELECT COUNT(*) FROM member")
        if cursor.fetchone()[0] == 0:
            members = [
                ('John Doe', 'john.doe@email.com', '1234567890'),
                ('Jane Smith', 'jane.smith@email.com', '0987654321'),
                ('Bob Johnson', 'bob.johnson@email.com', '5555555555'),
                ('Alice Brown', 'alice.brown@email.com', '1111111111'),
                ('Charlie Wilson', 'charlie.wilson@email.com', '2222222222')
            ]
            
            cursor.executemany(
                "INSERT INTO member (name, email, phone) VALUES (%s, %s, %s)",
                members
            )
            print(f"✅ Added {len(members)} sample members")
        
        # Admin
        cursor.execute("SELECT COUNT(*) FROM admin")
        if cursor.fetchone()[0] == 0:
            cursor.execute(
                "INSERT INTO admin (username, password_hash) VALUES (%s, %s)",
                ('admin', 'admin123')
            )
            print("✅ Added admin user (admin/admin123)")
        
        connection.commit()
        
        # Verify data
        cursor.execute("SELECT COUNT(*) FROM book")
        book_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM member")
        member_count = cursor.fetchone()[0]
        
        print(f"\n📊 Database Status:")
        print(f"📚 Books: {book_count}")
        print(f"👥 Members: {member_count}")
        print(f"✅ Database is ready!")
        
        return True
        
    except Error as e:
        print(f"❌ Database error: {e}")
        return False
    
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    fix_database()
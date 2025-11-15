-- Library Management System Database Schema
-- Execute this in MySQL Workbench

-- Create database
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS book;

-- Create Books table
CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

-- Create Members table
CREATE TABLE member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Create Transactions table
CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME NULL,
    fine DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
);

-- Create Admin table
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL
);

-- Insert sample books
INSERT INTO book (title, author, category) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction'),
('1984', 'George Orwell', 'Fiction'),
('Pride and Prejudice', 'Jane Austen', 'Romance'),
('Harry Potter', 'J.K. Rowling', 'Fantasy'),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy'),
('Dune', 'Frank Herbert', 'Science'),
('Sapiens', 'Yuval Noah Harari', 'Non-Fiction'),
('Clean Code', 'Robert Martin', 'Technology'),
('The Alchemist', 'Paulo Coelho', 'Fiction');

-- Insert sample members
INSERT INTO member (name, email, phone) VALUES
('John Doe', 'john.doe@email.com', '1234567890'),
('Jane Smith', 'jane.smith@email.com', '0987654321'),
('Bob Johnson', 'bob.johnson@email.com', '5555555555'),
('Alice Brown', 'alice.brown@email.com', '1111111111'),
('Charlie Wilson', 'charlie.wilson@email.com', '2222222222');

-- Admin will be created automatically by Flask app (username: admin, password: admin123)

-- Verify tables created
SHOW TABLES;
SELECT COUNT(*) as total_books FROM book;
SELECT COUNT(*) as total_members FROM member;
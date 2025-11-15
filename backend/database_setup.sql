-- Create database
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- Create tables (SQLAlchemy will handle this, but here's the schema for reference)

-- Books table
CREATE TABLE IF NOT EXISTS book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

-- Members table
CREATE TABLE IF NOT EXISTS member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME NULL,
    fine DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (book_id) REFERENCES book(id),
    FOREIGN KEY (member_id) REFERENCES member(id)
);

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL
);

-- Insert sample data (with IGNORE to prevent duplicates)
INSERT IGNORE INTO book (title, author, category) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction'),
('1984', 'George Orwell', 'Fiction'),
('Pride and Prejudice', 'Jane Austen', 'Romance'),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction'),
('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'Fantasy'),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy'),
('Dune', 'Frank Herbert', 'Science Fiction'),
('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 'Science Fiction'),
('Sapiens', 'Yuval Noah Harari', 'Non-Fiction');

INSERT IGNORE INTO member (name, email, phone) VALUES
('John Doe', 'john.doe@email.com', '1234567890'),
('Jane Smith', 'jane.smith@email.com', '0987654321'),
('Bob Johnson', 'bob.johnson@email.com', '5555555555'),
('Alice Brown', 'alice.brown@email.com', '1111111111'),
('Charlie Wilson', 'charlie.wilson@email.com', '2222222222');

INSERT IGNORE INTO admin (username, password_hash) VALUES
('admin', 'admin123');
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Sample data
books = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "category": "Fiction", "available": True},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee", "category": "Fiction", "available": True},
    {"id": 3, "title": "1984", "author": "George Orwell", "category": "Fiction", "available": False},
    {"id": 4, "title": "Pride and Prejudice", "author": "Jane Austen", "category": "Romance", "available": True},
    {"id": 5, "title": "Harry Potter", "author": "J.K. Rowling", "category": "Fantasy", "available": True}
]

members = [
    {"id": 1, "name": "John Doe", "email": "john.doe@email.com", "phone": "1234567890", "active": True},
    {"id": 2, "name": "Jane Smith", "email": "jane.smith@email.com", "phone": "0987654321", "active": True},
    {"id": 3, "name": "Bob Johnson", "email": "bob.johnson@email.com", "phone": "5555555555", "active": True}
]

transactions = [
    {"id": 1, "book_id": 3, "member_id": 1, "issue_date": "2024-01-15T10:00:00", "return_date": None, "fine": 0.0, "book_title": "1984", "member_name": "John Doe"}
]

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "database": "connected", "message": "Backend is running"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('username') == 'admin' and data.get('password') == 'admin123':
        return jsonify({"access_token": "sample-token-123"})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    return jsonify({
        "total_books": len(books),
        "available_books": len([b for b in books if b['available']]),
        "issued_books": len([b for b in books if not b['available']]),
        "active_members": len([m for m in members if m['active']])
    })

@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = {
        "id": len(books) + 1,
        "title": data['title'],
        "author": data['author'],
        "category": data['category'],
        "available": True
    }
    books.append(new_book)
    return jsonify(new_book), 201

@app.route('/api/members', methods=['GET'])
def get_members():
    return jsonify(members)

@app.route('/api/members', methods=['POST'])
def add_member():
    data = request.get_json()
    new_member = {
        "id": len(members) + 1,
        "name": data['name'],
        "email": data['email'],
        "phone": data['phone'],
        "active": True
    }
    members.append(new_member)
    return jsonify(new_member), 201

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify(transactions)

@app.route('/api/transactions/issue', methods=['POST'])
def issue_book():
    data = request.get_json()
    book = next((b for b in books if b['id'] == data['book_id']), None)
    member = next((m for m in members if m['id'] == data['member_id']), None)
    
    if book and member and book['available']:
        book['available'] = False
        new_transaction = {
            "id": len(transactions) + 1,
            "book_id": book['id'],
            "member_id": member['id'],
            "issue_date": "2024-01-20T10:00:00",
            "return_date": None,
            "fine": 0.0,
            "book_title": book['title'],
            "member_name": member['name']
        }
        transactions.append(new_transaction)
        return jsonify(new_transaction), 201
    
    return jsonify({"error": "Book not available"}), 400

if __name__ == '__main__':
    print("🚀 Starting Simple Backend Server...")
    print("✅ Server running on http://localhost:5000")
    print("👤 Login: admin / admin123")
    app.run(debug=True, host='0.0.0.0', port=5000)
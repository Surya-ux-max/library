import pytest
import json
from app import app, db, Book, Member, Transaction, Admin, bcrypt

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Create test admin
            password_hash = bcrypt.generate_password_hash('testpass').decode('utf-8')
            admin = Admin(username='testadmin', password_hash=password_hash)
            db.session.add(admin)
            db.session.commit()
        yield client

@pytest.fixture
def auth_headers(client):
    # Login and get token
    response = client.post('/api/login', 
                          data=json.dumps({'username': 'testadmin', 'password': 'testpass'}),
                          content_type='application/json')
    token = json.loads(response.data)['access_token']
    return {'Authorization': f'Bearer {token}'}

def test_login_success(client):
    response = client.post('/api/login', 
                          data=json.dumps({'username': 'testadmin', 'password': 'testpass'}),
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'access_token' in data

def test_login_failure(client):
    response = client.post('/api/login', 
                          data=json.dumps({'username': 'wrong', 'password': 'wrong'}),
                          content_type='application/json')
    assert response.status_code == 401

def test_add_book(client, auth_headers):
    book_data = {
        'title': 'Test Book',
        'author': 'Test Author',
        'category': 'Fiction'
    }
    response = client.post('/api/books',
                          data=json.dumps(book_data),
                          content_type='application/json',
                          headers=auth_headers)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == 'Test Book'

def test_get_books(client, auth_headers):
    response = client.get('/api/books', headers=auth_headers)
    assert response.status_code == 200

def test_add_member(client, auth_headers):
    member_data = {
        'name': 'Test Member',
        'email': 'test@example.com',
        'phone': '1234567890'
    }
    response = client.post('/api/members',
                          data=json.dumps(member_data),
                          content_type='application/json',
                          headers=auth_headers)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'Test Member'

def test_dashboard(client, auth_headers):
    response = client.get('/api/dashboard', headers=auth_headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'total_books' in data
    assert 'available_books' in data
    assert 'issued_books' in data
    assert 'active_members' in data

if __name__ == '__main__':
    pytest.main([__file__])
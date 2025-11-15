import requests

# Test login directly
url = "http://localhost:5000/api/login"
data = {"username": "admin", "password": "admin123"}

try:
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
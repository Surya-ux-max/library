import requests
import json

# Test backend connection
def test_backend():
    base_url = "http://localhost:5000/api"
    
    print("Testing backend connection...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
        return False
    
    # Test login
    try:
        login_data = {"username": "admin", "password": "admin123"}
        response = requests.post(f"{base_url}/login", json=login_data)
        print(f"Login test: {response.status_code} - {response.json()}")
        
        if response.status_code == 200:
            token = response.json()['access_token']
            
            # Test dashboard with token
            headers = {"Authorization": f"Bearer {token}"}
            response = requests.get(f"{base_url}/dashboard", headers=headers)
            print(f"Dashboard test: {response.status_code} - {response.json()}")
            
            return True
    except Exception as e:
        print(f"Login test failed: {e}")
        return False

if __name__ == "__main__":
    test_backend()
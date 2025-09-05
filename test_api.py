import requests
import json

# Test data that matches the frontend form
test_data = {
    "age": 45,
    "sex": 1,
    "cp": 0,
    "trestbps": 130,
    "chol": 250,
    "fbs": 0,
    "restecg": 0,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 0.0,
    "slope": 0,
    "ca": 0,
    "thal": 0
}

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get('http://localhost:8000/health')
        print("Health Check Response:")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_predict_endpoint():
    """Test the predict endpoint"""
    try:
        response = requests.post(
            'http://localhost:8000/predict',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(test_data)
        )
        
        print("Predict Endpoint Response:")
        print(f"Status: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Success Response: {result}")
        else:
            print(f"Error Response: {response.text}")
        
        print("-" * 50)
        return response.status_code == 200
    except Exception as e:
        print(f"Predict test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing HeartCare API...")
    print("=" * 50)
    
    # Test health endpoint
    health_ok = test_health_endpoint()
    
    # Test predict endpoint
    predict_ok = test_predict_endpoint()
    
    if health_ok and predict_ok:
        print("✅ All tests passed! API is working correctly.")
    else:
        print("❌ Some tests failed. Check the server logs for details.")

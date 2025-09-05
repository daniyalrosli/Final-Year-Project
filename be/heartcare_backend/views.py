from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'heart_disease_model.pkl')
SCALER_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'scaler.pkl')

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Ensure all expected features are present
            expected_features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
            X = [float(data.get(feat, 0)) for feat in expected_features]

            # Load model and scaler
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)

            X_scaled = scaler.transform([X])
            pred = model.predict(X_scaled)[0]
            confidence = max(model.predict_proba(X_scaled)[0]) * 100 if hasattr(model, 'predict_proba') else 0
            riskScore = confidence  # You can customize this

            return JsonResponse({
                'prediction': int(pred),
                'confidence': float(confidence),
                'riskScore': float(riskScore)
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User created successfully'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})
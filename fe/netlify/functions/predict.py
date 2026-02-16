import json
import joblib
import numpy as np
import pandas as pd
import os

# Get the directory where this function is located
FUNCTION_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the trained model and scaler from the function directory
model = None
scaler = None

def load_models():
    global model, scaler
    if model is None or scaler is None:
        model_path = os.path.join(FUNCTION_DIR, 'heart_disease_model.pkl')
        scaler_path = os.path.join(FUNCTION_DIR, 'scaler.pkl')
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
    return model, scaler

# Define the column names for the features (13 features expected)
COLUMNS = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
    'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

def handler(event, context):
    # Handle CORS preflight
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }
    
    # Handle OPTIONS request (CORS preflight)
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Only allow POST requests
    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        
        # Validate required fields
        missing_fields = [col for col in COLUMNS if col not in body]
        if missing_fields:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': f'Missing required fields: {", ".join(missing_fields)}'})
            }
        
        # Extract features
        features = [float(body[col]) for col in COLUMNS]
        
        # Load models
        model, scaler = load_models()
        
        # Convert input data to a pandas DataFrame
        input_data = pd.DataFrame([features], columns=COLUMNS)
        
        # Scale the input data
        input_data_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        
        # Get prediction probability
        probability = model.predict_proba(input_data_scaled)[0]
        
        # Format the result
        result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
        confidence = f"{max(probability) * 100:.2f}"
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'prediction': result,
                'confidence': confidence
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }

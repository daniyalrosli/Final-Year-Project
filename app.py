from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all domains (needed for Netlify frontend)
CORS(app, resources={
    r"/*": {
        "origins": ["https://heartcarefyp.netlify.app", "http://localhost:3000", "*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Load the trained model and scaler
model = joblib.load('heart_disease_model.pkl')
scaler = joblib.load('scaler.pkl')  # Load the saved scaler

# Define the column names for the features (13 features expected)
columns = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
    'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

@app.route('/')
def index():
    return jsonify({
        "message": "HeartCare API is running",
        "status": "healthy",
        "endpoints": {
            "predict": "/predict (POST)",
            "health": "/health (GET)"
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if request is JSON (API) or form data (web form)
        if request.is_json:
            # Extract input features from JSON (API request)
            data = request.get_json()
            features = [float(data[col]) for col in columns]
        else:
            # Extract input features from form (web form request)
            features = [float(x) for x in request.form.values()]
        
        # Ensure that the correct number of features are received (13 features expected)
        if len(features) != 13:
            if request.is_json:
                return jsonify({"error": "Please provide all 13 fields."}), 400
            else:
                return "Error: Please fill out all 13 fields."
        
        # Convert input data to a pandas DataFrame
        input_data = pd.DataFrame([features], columns=columns)
        
        # Scale the input data
        input_data_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        
        # Get prediction probability
        probability = model.predict_proba(input_data_scaled)[0]
        
        # Format the result
        result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
        confidence = f"{max(probability) * 100:.2f}% confidence"
        
        # Return response based on request type
        if request.is_json:
            # Return prediction result as JSON (API response)
            return jsonify({"prediction": result, "confidence": confidence})
        else:
            # Render result in the HTML page (web form response)
            return render_template('result.html', prediction=result, confidence=confidence)
            
    except Exception as e:
        if request.is_json:
            return jsonify({"error": str(e)}), 500
        else:
            return f"Error: {str(e)}"

# Run the app
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Enable CORS only for your frontend
CORS(app, resources={r"/*": {"origins": "https://heartcare-brown.vercel.app"}})

# Load the trained model and scaler
try:
    model = joblib.load('heart_disease_model.pkl')
    scaler = joblib.load('scaler.pkl')  # Load the saved scaler
except Exception as e:
    print(f"Error loading model or scaler: {e}")

# Define the column names (same as the ones used in training)
columns = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach',
    'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

@app.route('/')
def index():
    return render_template('index.html')  # Display input form

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input
        data = request.get_json()

        # Validate input data
        if not data or len(data) != len(columns):
            return jsonify({"error": "Invalid input. Ensure all 13 fields are provided."}), 400

        # Convert input data to DataFrame
        input_data = pd.DataFrame([data], columns=columns)

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)

        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        probability = model.predict_proba(input_data_scaled)[0]  # Probability scores

        # Prepare response
        result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
        confidence = f"{max(probability) * 100:.2f}%"
        risk_score = f"{probability[1] * 100:.2f}%"

        return jsonify({
            "prediction": result,
            "confidence": confidence,
            "riskScore": risk_score
        })

    except Exception as e:
        print(f"Prediction Error: {e}")  # Log error
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Load the trained model and scaler
model = joblib.load('heart_disease_model.pkl')
scaler = joblib.load('scaler.pkl')  # Load the saved scaler

# Define the column names (same as the ones used in training)
columns = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach',
    'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

# Define routes
@app.route('/')
def index():
    return render_template('index.html')  # Display input form

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract input features from the form
        data = request.get_json()  # Expecting JSON input from the frontend (this will be the case for API requests)

        # Ensure that the correct number of features are received (13 features expected)
        if len(data) != 13:
            return jsonify({"error": "Please fill out all 13 fields."}), 400  # Return error message as JSON

        # Convert input data to a pandas DataFrame
        input_data = pd.DataFrame([data], columns=columns)

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)  # Apply the scaler transformation

        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        probability = model.predict_proba(input_data_scaled)[0]  # Probability scores

        # Interpretation of the result
        result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
        confidence = f"{max(probability) * 100:.2f}% confidence"

        # Return prediction result as JSON
        return jsonify({"prediction": result, "confidence": confidence})

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message as JSON in case of exception

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, render_template
import joblib
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

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
        # Extract input features from form
        features = [float(x) for x in request.form.values()]  # Convert form inputs to float

        # Ensure that the correct number of features are received (13 features expected)
        if len(features) != 13:
            return "Error: Please fill out all 13 fields."

        # Convert input data to a pandas DataFrame
        input_data = pd.DataFrame([features], columns=columns)

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)  # Apply the scaler transformation

        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        probability = model.predict_proba(input_data_scaled)[0]  # Probability scores

        # Interpretation of the result
        result = "Heart Disease Detected" if prediction == 1 else "No Heart Disease"
        confidence = f"{max(probability) * 100:.2f}% confidence"

        # Render result in the HTML page
        return render_template('result.html', prediction=result, confidence=confidence)

    except Exception as e:
        return f"Error: {str(e)}"

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
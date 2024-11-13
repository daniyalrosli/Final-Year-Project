from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
try:
    model = pickle.load(open('models/logistic_regression_model.pkl', 'rb'))
    model_loaded = True
except Exception as e:
    model_loaded = False
    print(f"Error loading model: {e}")

# Home route
@app.route('/')
def home():
    if model_loaded:
        return "Model loaded successfully!"
    else:
        return "Failed to load the model."

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    if not model_loaded:
        return jsonify({'error': 'Model not loaded properly'}), 500
    
    data = request.get_json(force=True)
    features = [data['age'], data['sex'], data['cp'], data['trestbps'], data['chol'], 
                data['fbs'], data['restecg'], data['thalach'], data['exang'], 
                data['oldpeak'], data['slope'], data['ca'], data['thal']]
    prediction = model.predict([np.array(features)])
    output = prediction[0]
    return jsonify({'prediction': int(output)})

if __name__ == '__main__':
    app.run(debug=True)
    

from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = pickle.load(open('models/logistic_regression_model.pkl', 'rb'))

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = [data['age'], data['sex'], data['cp'], data['trestbps'], data['chol'], 
                data['fbs'], data['restecg'], data['thalach'], data['exang'], 
                data['oldpeak'], data['slope'], data['ca'], data['thal']]
    prediction = model.predict([np.array(features)])
    output = prediction[0]
    return jsonify({'prediction': int(output)})

if __name__ == '__main__':
    app.run(debug=True)


    

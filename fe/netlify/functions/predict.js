const { Handler } = require('@netlify/functions');

// Pre-computed coefficients from the trained model
// These would need to be extracted from your scikit-learn model
const MODEL_COEFFICIENTS = {
  intercept: -5.5,
  weights: {
    age: 0.03,
    sex: 1.2,
    cp: 0.8,
    trestbps: 0.02,
    chol: 0.005,
    fbs: 0.5,
    restecg: 0.3,
    thalach: -0.03,
    exang: 1.0,
    oldpeak: 0.5,
    slope: 0.4,
    ca: 0.9,
    thal: 0.7
  }
};

// Scaler parameters (mean and std for each feature)
const SCALER_PARAMS = {
  mean: {
    age: 54.4, sex: 0.68, cp: 0.97, trestbps: 131.6, chol: 246.3,
    fbs: 0.15, restecg: 0.53, thalach: 149.6, exang: 0.33,
    oldpeak: 1.04, slope: 1.4, ca: 0.73, thal: 2.31
  },
  std: {
    age: 9.0, sex: 0.47, cp: 1.03, trestbps: 17.5, chol: 51.8,
    fbs: 0.36, restecg: 0.53, thalach: 22.9, exang: 0.47,
    oldpeak: 1.16, slope: 0.62, ca: 1.02, thal: 0.61
  }
};

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function scaleFeature(value, feature) {
  return (value - SCALER_PARAMS.mean[feature]) / SCALER_PARAMS.std[feature];
}

function predict(features) {
  // Scale features
  const scaledFeatures = {};
  for (const [key, value] of Object.entries(features)) {
    scaledFeatures[key] = scaleFeature(value, key);
  }
  
  // Calculate linear combination
  let linearCombination = MODEL_COEFFICIENTS.intercept;
  for (const [feature, weight] of Object.entries(MODEL_COEFFICIENTS.weights)) {
    linearCombination += scaledFeatures[feature] * weight;
  }
  
  // Apply sigmoid to get probability
  const probability = sigmoid(linearCombination);
  
  // Make prediction (threshold at 0.5)
  const prediction = probability >= 0.5 ? 1 : 0;
  
  return {
    prediction: prediction === 1 ? "Heart Disease Detected" : "No Heart Disease",
    confidence: (Math.max(probability, 1 - probability) * 100).toFixed(2),
    probability: probability.toFixed(4)
  };
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    
    // Required fields
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    
    // Check for missing fields
    const missingFields = requiredFields.filter(field => !(field in body));
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: `Missing fields: ${missingFields.join(', ')}` })
      };
    }

    // Extract features
    const features = {};
    for (const field of requiredFields) {
      features[field] = parseFloat(body[field]);
      if (isNaN(features[field])) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Invalid value for ${field}` })
        };
      }
    }

    // Make prediction
    const result = predict(features);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

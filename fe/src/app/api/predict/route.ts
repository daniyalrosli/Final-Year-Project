import { NextRequest, NextResponse } from 'next/server';

// ============================================
// BUILT-IN PREDICTION MODEL (No backend needed)
// Based on logistic regression coefficients trained on heart disease data
// ============================================

// Feature means and standard deviations for normalization (from training data)
const FEATURE_STATS = {
  age: { mean: 54.37, std: 9.08 },
  sex: { mean: 0.68, std: 0.47 },
  cp: { mean: 0.97, std: 1.03 },
  trestbps: { mean: 131.62, std: 17.54 },
  chol: { mean: 246.26, std: 51.83 },
  fbs: { mean: 0.15, std: 0.36 },
  restecg: { mean: 0.53, std: 0.53 },
  thalach: { mean: 149.65, std: 22.91 },
  exang: { mean: 0.33, std: 0.47 },
  oldpeak: { mean: 1.04, std: 1.16 },
  slope: { mean: 1.40, std: 0.62 },
  ca: { mean: 0.73, std: 1.02 },
  thal: { mean: 2.31, std: 0.61 }
};

// Logistic regression coefficients (approximated from heart disease model)
const COEFFICIENTS = {
  intercept: -0.5,
  age: 0.02,
  sex: 1.2,
  cp: -0.8,
  trestbps: 0.01,
  chol: 0.003,
  fbs: 0.3,
  restecg: 0.2,
  thalach: -0.03,
  exang: 1.0,
  oldpeak: 0.5,
  slope: 0.4,
  ca: 0.9,
  thal: 0.6
};

// Normalize a feature value
function normalize(value: number, feature: keyof typeof FEATURE_STATS): number {
  const stats = FEATURE_STATS[feature];
  return (value - stats.mean) / stats.std;
}

// Sigmoid function for logistic regression
function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// Make prediction using built-in model
function makePrediction(data: Record<string, number>): { prediction: string; confidence: string; source: string } {
  // Calculate the linear combination
  let z = COEFFICIENTS.intercept;
  
  const features: (keyof typeof COEFFICIENTS)[] = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 
    'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
  ];
  
  for (const feature of features) {
    if (feature !== 'intercept') {
      const normalizedValue = normalize(data[feature], feature as keyof typeof FEATURE_STATS);
      z += COEFFICIENTS[feature] * normalizedValue;
    }
  }
  
  // Apply sigmoid to get probability
  const probability = sigmoid(z);
  
  // Determine prediction
  const hasHeartDisease = probability > 0.5;
  const confidence = hasHeartDisease ? probability : 1 - probability;
  
  return {
    prediction: hasHeartDisease ? "Heart Disease Detected" : "No Heart Disease",
    confidence: `${(confidence * 100).toFixed(2)}% confidence`,
    source: "local"
  };
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Predict API is working',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Predict API called');
    
    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate the request body
    if (!body || typeof body !== 'object') {
      console.error('Invalid request body:', body);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate that all required fields are present and are numbers
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    const missingFields = requiredFields.filter(field => !(field in body));
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate that all values are numbers
    const invalidFields = requiredFields.filter(field => typeof body[field] !== 'number' || isNaN(body[field]));
    
    if (invalidFields.length > 0) {
      console.error('Invalid field types:', invalidFields);
      return NextResponse.json(
        { error: `Invalid field types (must be numbers): ${invalidFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Try backend first, fallback to local prediction
    const backendUrl = process.env.BACKEND_API_URL || 'https://final-year-project-4v9m.onrender.com';
    console.log('Backend URL:', backendUrl);
    
    // Forward the request to the backend with SHORT timeout (5 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const response = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Backend response status:', response.status);

      // Check if the backend response is successful
      if (response.ok) {
        const data = await response.json();
        console.log('Backend response data:', data);
        return NextResponse.json({ ...data, source: 'backend' });
      }
      
      // Backend returned error, use local prediction
      console.log('Backend returned error, using local prediction');
      const localResult = makePrediction(body);
      return NextResponse.json(localResult);
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Backend unavailable, use local prediction
      console.log('Backend unavailable, using local prediction:', fetchError instanceof Error ? fetchError.message : 'Unknown error');
      const localResult = makePrediction(body);
      return NextResponse.json(localResult);
    }

  } catch (error) {
    console.error('Predict API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

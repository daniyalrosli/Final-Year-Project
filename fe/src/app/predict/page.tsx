// predict/page.tsx

'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '../components/navbar';

// Define the structure for form data
type FormData = {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

// PredictForm component
const PredictForm = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });
  
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: string; confidence: string } | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validation logic
  const validate = () => {
    const newErrors: Errors = {};
    
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
        newErrors[key as keyof FormData] = `${fieldName} is required.`;
      } else {
        // Additional validation for numeric fields
        const numericFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
        if (numericFields.includes(key)) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
            newErrors[key as keyof FormData] = `${fieldName} must be a valid number.`;
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Convert form data to numeric values for API
    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction request failed');
      }

      const data = await response.json();
      console.log('API Response:', data);

      setResult({
        prediction: data.prediction || "Unknown",
        confidence: data.confidence || "0",
      });

      // --- Save to localStorage for dashboard ---
      const predictionData = {
        formData,
        prediction: data.prediction || "Unknown",
        confidence: data.confidence || "0",
        timestamp: new Date().toISOString(),
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
      };

      // Save latest prediction
      localStorage.setItem('latestHeartPrediction', JSON.stringify(predictionData));

      // Save to history
      const historyKey = 'heartPredictionHistory';
      const prevHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      localStorage.setItem(historyKey, JSON.stringify([predictionData, ...prevHistory]));
      // --- End localStorage block ---

    } catch (error) {
      console.error('Error during prediction:', error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formFields: { id: keyof FormData; label: string; type: string; placeholder: string }[] = [
    { id: 'age', label: 'Age', type: 'number', placeholder: 'Enter age (e.g., 50)' },
    { id: 'sex', label: 'Sex', type: 'number', placeholder: '0 = Female, 1 = Male' },
    { id: 'cp', label: 'Chest Pain Type', type: 'number', placeholder: '0-3 (0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic)' },
    { id: 'trestbps', label: 'Resting Blood Pressure', type: 'number', placeholder: 'mm Hg (e.g., 120)' },
    { id: 'chol', label: 'Serum Cholesterol', type: 'number', placeholder: 'mg/dL (e.g., 200)' },
    { id: 'fbs', label: 'Fasting Blood Sugar', type: 'number', placeholder: '1 if >120 mg/dL, 0 otherwise' },
    { id: 'restecg', label: 'Resting ECG', type: 'number', placeholder: '0-2 (0: Normal, 1: ST-T abnormality, 2: LV hypertrophy)' },
    { id: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', placeholder: 'BPM (e.g., 150)' },
    { id: 'exang', label: 'Exercise Induced Angina', type: 'number', placeholder: '0 = No, 1 = Yes' },
    { id: 'oldpeak', label: 'ST Depression', type: 'number', placeholder: 'Induced by exercise (e.g., 2.3)' },
    { id: 'slope', label: 'Slope of ST Segment', type: 'number', placeholder: '0-2 (0: Upsloping, 1: Flat, 2: Downsloping)' },
    { id: 'ca', label: 'Major Vessels Colored', type: 'number', placeholder: '0-4 vessels' },
    { id: 'thal', label: 'Thalassemia', type: 'number', placeholder: '0: Normal, 1: Fixed defect, 2: Reversible defect' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Heart Disease Risk Prediction
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            {formFields.map(field => (
              <div key={field.id} className="flex flex-col space-y-2">
                <label htmlFor={field.id} className="text-gray-700 font-medium">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  className={`text-black ${errors[field.id] ? 'border-red-500' : ''}`}
                />
                {errors[field.id] && (
                  <span className="text-red-500 text-sm">{errors[field.id]}</span>
                )}
              </div>
            ))}
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Heart Disease Risk'}
            </Button>
          </form>

          {/* Prediction Result Section */}
          {result && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Prediction Result
              </h2>
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Prediction:</strong> {result.prediction}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Confidence:</strong> {result.confidence}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PredictForm;

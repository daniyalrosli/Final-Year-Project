'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Navbar component definition
const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div className="flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-red-500">Home</a>
          <a href="/patient" className="text-gray-700 hover:text-red-500">Patient</a>
          <a href="/predict" className="text-gray-700 hover:text-red-500">Predict</a>
          <a href="/report" className="text-gray-700 hover:text-red-500">Reports</a>
        </div>
      </div>
    </nav>
  );
};

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
  const [result, setResult] = useState<{ prediction: string; confidence: string; riskScore: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: Errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key as keyof FormData] = `${key.toUpperCase()} is required.`;
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
        riskScore: data.riskScore || "0",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during prediction:', error.message, error.stack);
        alert(`Error: ${error.message}`);
      } else {
        console.error('Error during prediction:', error);
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formFields: { id: keyof FormData; label: string; type: string }[] = [
    { id: 'age', label: 'Age', type: 'number' },
    { id: 'sex', label: 'Sex (0 = Female, 1 = Male)', type: 'number' },
    { id: 'cp', label: 'Chest Pain Type (0-3)', type: 'number' },
    { id: 'trestbps', label: 'Resting BP (mm Hg)', type: 'number' },
    { id: 'chol', label: 'Serum Cholesterol (mg/dL)', type: 'number' },
    { id: 'fbs', label: 'Fasting Blood Sugar (>120 mg/dL: 1, else 0)', type: 'number' },
    { id: 'restecg', label: 'Resting ECG (0-2)', type: 'number' },
    { id: 'thalach', label: 'Max Heart Rate Achieved', type: 'number' },
    { id: 'exang', label: 'Exercise Induced Angina (0 = No, 1 = Yes)', type: 'number' },
    { id: 'oldpeak', label: 'ST Depression', type: 'number' },
    { id: 'slope', label: 'Slope of ST Segment (0-2)', type: 'number' },
    { id: 'ca', label: 'Major Vessels Colored (0-4)', type: 'number' },
    { id: 'thal', label: 'Thalassemia (0 = Normal, 1 = Fixed Defect, 2 = Reversible Defect)', type: 'number' },
  ];

  const getAdvice = () => {
    if (!result) {
      return (
        <div className="p-6 bg-gray-50 text-gray-700 rounded-lg shadow-md flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold">Awaiting Result</h3>
            <p className="mt-2 text-base">Please submit the necessary information to receive heart health advice.</p>
          </div>
        </div>
      );
    } else if (result?.prediction === "Heart Disease Detected") {
      return (
        <div className="p-6 bg-red-100 text-red-800 rounded-lg shadow-lg flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2h-2v7h-3l4 4 4-4h-3z" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold">Immediate Attention Required</h3>
            <p className="mt-2 text-base">Heart disease detected. Seek medical attention immediately for a thorough examination and further action.</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6 bg-green-100 text-green-800 rounded-lg shadow-lg flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold">Heart Health Advice</h3>
            <p className="mt-2 text-base">Your heart health is in good condition! To maintain a healthy heart, continue regular exercise, a balanced diet, and routine check-ups.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 flex flex-col md:flex-row justify-center items-start md:space-x-12">
        <div className="max-w-3xl w-full px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Heart Disease Prediction</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            {formFields.map(field => (
              <div key={field.id} className="flex flex-col space-y-1">
                <label htmlFor={field.id} className="text-black font-medium">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  required
                  className="text-black"
                />
                {errors[field.id] && <span className="text-red-500 text-sm">{errors[field.id]}</span>}
              </div>
            ))}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict'}
            </Button>
          </form>

          {/* Updated Prediction Result Section */}
          {result && (
            <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold text-center text-gray-800">Prediction Result</h2>
              <div className="mt-4 space-y-3">
                <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                  <span className="text-lg font-medium text-gray-700">Prediction</span>
                  <span className={`text-xl font-bold ${
                    result.prediction === "Heart Disease Detected" ? "text-red-600" : "text-green-600"
                  }`}>
                    {result.prediction}
                  </span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                  <span className="text-lg font-medium text-gray-700">Confidence</span>
                  <span className="text-xl font-bold text-blue-600">
                    {result.confidence}%
                  </span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                  <span className="text-lg font-medium text-gray-700">Risk Score</span>
                  <span className="text-xl font-bold text-purple-600">
                    {result.riskScore}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Note */}
        <div className={`mt-8 md:mt-0 md:max-w-sm w-full md:pl-12 ${
          result ? "text-green-700" : "text-gray-600"
        }`}>
          {getAdvice()}
        </div>
      </div>
    </>
  );
};

export default PredictForm;
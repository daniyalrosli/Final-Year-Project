'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center space-x-2 text-3xl font-serif text-gray-800 hover:text-red-500 transition-colors">
          <HeartPulse className="w-8 h-8 text-red-500" />
          <span>HeartCare</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link href="/predict" className="text-gray-700 hover:text-red-500">Predict</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-red-500">Dashboard</Link>
          <Link href="/report" className="text-gray-700 hover:text-red-500">Reports</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-500">Contact</Link>
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
    // Define API URL
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ?? "https://final-year-project-4v9m.onrender.com";

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Check if response is okay
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get prediction");
    }

    // Parse response JSON
    const data = await response.json();

    setResult({
      prediction: data.prediction ?? "Unknown",
      confidence: data.confidence ?? "0%",
      riskScore: data.riskScore ?? "0%",
    });

  } catch (error) {
    console.error("Prediction API Error:", error);
    
    // Display user-friendly error message
    alert(error instanceof Error ? `Error: ${error.message}` : "An unexpected error occurred. Please try again.");
  
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

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 flex flex-col md:flex-row justify-center items-start md:space-x-12">
        <div className="max-w-3xl w-full px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Check Your Heart Condition !!!</h1>
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

                <div className="flex justify-center mt-6 space-x-6">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-lg font-medium text-gray-700">Confidence</span>
                    <span className="text-xl font-bold text-blue-600">{result.confidence}%</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-lg font-medium text-gray-700">Risk Score</span>
                    <span className="text-xl font-bold text-red-600">{result.riskScore}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <Link
                    href={{
                      pathname: "/dashboard",
                      query: { ...formData, prediction: result.prediction, confidence: result.confidence, riskScore: result.riskScore }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Go to Dashboard
                  </Link>

                  <Link
                    href={{
                      pathname: "/report",
                      query: { ...formData, prediction: result.prediction, confidence: result.confidence, riskScore: result.riskScore }
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PredictForm;

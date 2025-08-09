'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Navbar from '../components/navbar';

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
  const [activeSection, setActiveSection] = useState<'demographic' | 'clinical' | 'results'>('demographic');

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
        newErrors[key as keyof FormData] = `This field is required.`;
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
      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

      setActiveSection('results');

    } catch (error) {
      console.error("Prediction API Error:", error);
      
      // Display user-friendly error message
      alert(error instanceof Error ? `Error: ${error.message}` : "An unexpected error occurred. Please try again.");
    
    } finally {
      setLoading(false);
    }
  };

  // Group form fields into logical sections
  const demographicFields: Field[] = [
      { id: 'age', label: 'Age', type: 'number', help: 'Enter your age in years' },
      { id: 'sex', label: 'Sex', type: 'select', options: [
        { value: '0', label: 'Female' },
        { value: '1', label: 'Male' }
      ], help: 'Select your biological sex' },
    ];

  const clinicalFields: Field[] = [
      { id: 'cp', label: 'Chest Pain Type', type: 'select', options: [
        { value: '0', label: 'Typical Angina' },
        { value: '1', label: 'Atypical Angina' },
        { value: '2', label: 'Non-anginal Pain' },
        { value: '3', label: 'Asymptomatic' }
      ], help: 'Select the type of chest pain you experience' },
      { id: 'trestbps', label: 'Resting Blood Pressure', type: 'number', help: 'Resting blood pressure in mm Hg' },
      { id: 'chol', label: 'Serum Cholesterol', type: 'number', help: 'Cholesterol level in mg/dL' },
      { id: 'fbs', label: 'Fasting Blood Sugar', type: 'select', options: [
        { value: '0', label: '≤ 120 mg/dL' },
        { value: '1', label: '> 120 mg/dL' }
      ], help: 'Is your fasting blood sugar > 120 mg/dL?' },
      { id: 'restecg', label: 'Resting ECG Results', type: 'select', options: [
        { value: '0', label: 'Normal' },
        { value: '1', label: 'ST-T Wave Abnormality' },
        { value: '2', label: 'Left Ventricular Hypertrophy' }
      ], help: 'Resting electrocardiographic results' },
      { id: 'thalach', label: 'Maximum Heart Rate', type: 'number', help: 'Maximum heart rate achieved' },
      { id: 'exang', label: 'Exercise Induced Angina', type: 'select', options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' }
      ], help: 'Do you experience chest pain during exercise?' },
      { id: 'oldpeak', label: 'ST Depression', type: 'number', help: 'ST depression induced by exercise relative to rest' },
      { id: 'slope', label: 'Slope of ST Segment', type: 'select', options: [
        { value: '0', label: 'Upsloping' },
        { value: '1', label: 'Flat' },
        { value: '2', label: 'Downsloping' }
      ], help: 'The slope of the peak exercise ST segment' },
      { id: 'ca', label: 'Number of Major Vessels', type: 'select', options: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ], help: 'Number of major vessels colored by fluoroscopy' },
      { id: 'thal', label: 'Thalassemia', type: 'select', options: [
        { value: '0', label: 'Normal' },
        { value: '1', label: 'Fixed Defect' },
        { value: '2', label: 'Reversible Defect' }
      ], help: 'Thalassemia type' },
    ];

  type Field = {
    id: string;
    label: string;
    type: 'number' | 'select';
    options?: { value: string; label: string }[];
    help?: string;
  };

  const renderField = (field: Field) => {
    if (field.type === 'select') {
      return (
        <div key={field.id} className="mb-6">
          <label htmlFor={field.id} className="block text-gray-900 font-medium mb-2">
            {field.label}
          </label>
          <select
            id={field.id}
            name={field.id}
            value={formData[field.id as keyof FormData]}
            onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select an option</option>
            {field.options?.map((option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {field.help && <p className="text-sm text-gray-700 mt-2">{field.help}</p>}
          {errors[field.id as keyof FormData] && (
            <p className="text-red-500 text-sm mt-2">{errors[field.id as keyof FormData]}</p>
          )}
        </div>
      );
    }
    
    return (
      <div key={field.id} className="mb-6">
        <label htmlFor={field.id} className="block text-gray-900 font-medium mb-2">
          {field.label}
        </label>
        <Input
          id={field.id}
          name={field.id}
          type={field.type}
          value={formData[field.id as keyof FormData]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
        />
        {field.help && <p className="text-sm text-gray-700 mt-2">{field.help}</p>}
        {errors[field.id as keyof FormData] && (
          <p className="text-red-500 text-sm mt-2">{errors[field.id as keyof FormData]}</p>
        )}
      </div>
    );
  };

  const renderProgressBar = () => {
    const steps = [
      { id: 'demographic', label: 'Personal Info' },
      { id: 'clinical', label: 'Clinical Data' },
      { id: 'results', label: 'Results' }
    ];
    const currentIndex = steps.findIndex(step => step.id === activeSection);
    return (
      <div className="mb-8 animate-fade-in">
        <div className="flex justify-between items-center w-full mb-4">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center transition-colors duration-300 ${index <= currentIndex ? 'text-red-500' : 'text-gray-400'}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                ${index < currentIndex ? 'bg-red-500 text-white' : 
                  index === currentIndex ? 'border-2 border-red-500 text-red-500' : 
                  'border-2 border-gray-300 text-gray-400'}
              `}>
                {index < currentIndex ? '✓' : index + 1}
              </div>
              <span className="text-sm mt-2 font-medium text-gray-900">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-red-500 rounded-full transition-all duration-500 ease-in-out"
            style={{width: `${(currentIndex / (steps.length - 1)) * 100}%`}}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar currentPage="/predict" />
      <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Heart Health Assessment</h1>
            <p className="text-gray-900 max-w-2xl mx-auto text-lg">
              Input your health parameters to receive an instant evaluation of your heart disease risk.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            {renderProgressBar()}

            <form onSubmit={handleSubmit} className="transition-all duration-500">
              {activeSection === 'demographic' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <p className="text-gray-900 mb-8 text-lg">
                      Please provide your basic demographic information to start the assessment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {demographicFields.map(renderField)}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => setActiveSection('clinical')}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}

              {activeSection === 'clinical' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Clinical Information</h2>
                    <p className="text-gray-900 mb-8 text-lg">
                      Please provide your clinical measurements for accurate assessment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {clinicalFields.map(renderField)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-all duration-300"
                      onClick={() => setActiveSection('demographic')}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Get Results'}
                    </Button>
                  </div>
                </>
              )}

              {activeSection === 'results' && result && (
                <div className="text-center animate-fade-in">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Heart Health Results</h2>
                    <p className="text-gray-900 mb-8 text-lg">
                      Based on your provided information, here are your heart health assessment results.
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center p-6 rounded-full bg-gray-100 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round" 
                        className={`w-20 h-20 ${result.prediction === "Heart Disease Detected" ? "text-red-500" : "text-green-500"}`}>
                        {result.prediction === "Heart Disease Detected" ? (
                          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                        ) : (
                          <>
                            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                          </>
                        )}
                      </svg>
                    </div>

                    <h3 className={`text-3xl font-bold mb-8 ${
                      result.prediction === "Heart Disease Detected" ? "text-red-600" : "text-green-600"
                    }`}>
                      {result.prediction}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Confidence</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                          <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
                            style={{ width: `${parseFloat(result.confidence)}%` }}
                          ></div>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{result.confidence}%</p>
                      </div>

                      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Risk Score</h4>
                        <div className="relative pt-1 mb-4">
                          <div className="flex mb-2 items-center justify-between">
                            <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                              Low
                            </div>
                            <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                              Medium
                            </div>
                            <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                              High
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full transition-all duration-1000 ${
                                parseFloat(result.riskScore) < 25 ? 'bg-green-500' :
                                parseFloat(result.riskScore) < 50 ? 'bg-yellow-500' :
                                parseFloat(result.riskScore) < 75 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${result.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{result.riskScore}%</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: { ...formData, prediction: result.prediction, confidence: result.confidence, riskScore: result.riskScore }
                        }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 font-medium transform hover:scale-105"
                      >
                        View Detailed Dashboard
                      </Link>

                      <Link
                        href={{
                          pathname: "/report",
                          query: { ...formData, prediction: result.prediction, confidence: result.confidence, riskScore: result.riskScore }
                        }}
                        className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 font-medium transform hover:scale-105"
                      >
                        Generate PDF Report
                      </Link>
                      
                      <Button 
                        type="button" 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-4 px-8 rounded-lg transition-all duration-300"
                        onClick={() => {
                          setFormData({
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
                          setResult(null);
                          setActiveSection('demographic');
                        }}
                      >
                        Start New Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>© 2025 HeartCare. This tool is for educational purposes only and should not replace professional medical advice.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PredictForm;
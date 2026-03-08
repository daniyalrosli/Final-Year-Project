'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '../components/navbar';
import { Layout, Container, Section, Card, Grid } from "@/components/ui/layout";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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

type FormField = {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  helper?: string;
};

type FormSection = {
  title: string;
  description?: string;
  fields: FormField[];
};

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

  const getConfidenceValue = (confidence: string) => {
    const match = confidence.match(/[\d.]+/);
    if (!match) return null;
    const value = parseFloat(match[0]);
    if (Number.isNaN(value)) return null;
    return Math.round(value);
  };

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

  const formSections: FormSection[] = [
    {
      title: 'Patient Details',
      description: 'Basic demographic information helps personalize your risk assessment.',
      fields: [
        { id: 'age', label: 'Age', type: 'number', placeholder: 'Enter age (e.g., 50)', helper: 'Use your age in years.' },
        { id: 'sex', label: 'Sex', type: 'number', placeholder: '0 = Female, 1 = Male', helper: 'Enter 0 for female, 1 for male.' },
      ],
    },
    {
      title: 'Clinical Measurements',
      description: 'Key clinical values from your recent check-up or lab results.',
      fields: [
        { id: 'trestbps', label: 'Resting Blood Pressure', type: 'number', placeholder: 'mm Hg (e.g., 120)', helper: 'Resting blood pressure in mm Hg.' },
        { id: 'chol', label: 'Serum Cholesterol', type: 'number', placeholder: 'mg/dL (e.g., 200)', helper: 'Total cholesterol in mg/dL.' },
        { id: 'fbs', label: 'Fasting Blood Sugar', type: 'number', placeholder: '1 if >120 mg/dL, 0 otherwise', helper: '1 if fasting blood sugar > 120 mg/dL, else 0.' },
        { id: 'restecg', label: 'Resting ECG', type: 'number', placeholder: '0-2 (0: Normal, 1: ST-T abnormality, 2: LV hypertrophy)', helper: 'ECG result coded from 0 to 2.' },
      ],
    },
    {
      title: 'Exercise & Test Results',
      description: 'Information from exercise tests and imaging helps refine the prediction.',
      fields: [
        { id: 'cp', label: 'Chest Pain Type', type: 'number', placeholder: '0-3 (0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic)', helper: 'Chest pain category from 0 to 3.' },
        { id: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', placeholder: 'BPM (e.g., 150)', helper: 'Highest heart rate achieved (beats per minute).' },
        { id: 'exang', label: 'Exercise Induced Angina', type: 'number', placeholder: '0 = No, 1 = Yes', helper: '1 if exercise causes chest pain, else 0.' },
        { id: 'oldpeak', label: 'ST Depression', type: 'number', placeholder: 'Induced by exercise (e.g., 2.3)', helper: 'ST depression relative to rest.' },
        { id: 'slope', label: 'Slope of ST Segment', type: 'number', placeholder: '0-2 (0: Upsloping, 1: Flat, 2: Downsloping)', helper: 'Slope of the ST segment during peak exercise.' },
        { id: 'ca', label: 'Major Vessels Colored', type: 'number', placeholder: '0-4 vessels', helper: 'Number of major vessels (0–4) colored by fluoroscopy.' },
        { id: 'thal', label: 'Thalassemia', type: 'number', placeholder: '0: Normal, 1: Fixed defect, 2: Reversible defect', helper: 'Thalassemia test result coded 0–2.' },
      ],
    },
  ];

  const isHighRisk = result
    ? result.prediction.toLowerCase().includes('detected')
    : false;

  const confidenceValue = result ? getConfidenceValue(result.confidence) : null;

  return (
    <Layout>
      <Navbar currentPage="/predict" />
      <Section className="bg-gray-50">
        <Container size="lg" className="py-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <HeartIconSolid className="w-4 h-4" />
              Heart Disease Risk Assessment
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Enter Your Health Details
            </h1>
            <p className="text-base text-black max-w-2xl mx-auto">
              Provide your latest clinical and exercise test information to receive an instant, AI-powered estimate of your heart disease risk.
            </p>
          </div>

          <div className="mb-8">
            <ol className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 text-xs text-gray-600">
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white font-semibold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-black">Enter health details</p>
                  <p className="text-[11px] text-gray-500">Fill in your latest clinical measurements.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="hidden md:block w-8 h-px bg-gray-300" aria-hidden="true" />
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-semibold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-black">Run prediction</p>
                  <p className="text-[11px] text-gray-500">Our model analyzes your risk in seconds.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="hidden md:block w-8 h-px bg-gray-300" aria-hidden="true" />
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-semibold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-black">Review & discuss</p>
                  <p className="text-[11px] text-gray-500">Share the result with your clinician.</p>
                </div>
              </li>
            </ol>
          </div>

          <Grid cols={2} gap="xl" className="items-start">
            <Card padding="lg" shadow="lg" className="col-span-2 md:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-black">Prediction Form</h2>
                  <p className="text-sm text-black mt-1">
                    All fields are required. Use values from your most recent medical check-up for best accuracy.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {formSections.map((section) => (
                  <div key={section.title} className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-black uppercase tracking-wide">
                        {section.title}
                      </h3>
                      {section.description && (
                        <p className="text-xs text-gray-500 mt-1">{section.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field) => (
                        <div key={field.id} className="flex flex-col space-y-1.5">
                          <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <Input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id]}
                            onChange={handleInputChange}
                            className={`text-black ${errors[field.id] ? 'border-red-500 ring-1 ring-red-200' : ''}`}
                          />
                          {errors[field.id] ? (
                            <span className="text-red-500 text-xs">{errors[field.id]}</span>
                          ) : (
                            field.helper && (
                            <span className="text-black text-xs">{field.helper}</span>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
                  disabled={loading}
                >
                  {loading ? 'Analyzing your heart health...' : 'Predict Heart Disease Risk'}
                </Button>
              </form>
            </Card>

            <div className="col-span-2 md:col-span-1 space-y-6 mt-8 md:mt-0">
              <Card padding="md" shadow="md">
                <h2 className="text-lg font-semibold text-black mb-2">How to interpret the results</h2>
                <p className="text-sm text-black mb-2">
                  The prediction indicates whether the model detects a higher likelihood of heart disease based on your inputs.
                  This is a decision-support tool and not a medical diagnosis.
                </p>
                <p className="text-sm text-black">
                  Always discuss your results with a qualified healthcare professional, especially if the assessment suggests elevated risk.
                </p>
              </Card>

              {result && (
                <Card
                  padding="lg"
                  shadow="lg"
                  className={`border-2 relative overflow-hidden ${
                    isHighRisk ? 'border-red-400 bg-red-50' : 'border-emerald-400 bg-emerald-50'
                  }`}
                >
                  <div className="absolute inset-y-0 right-0 w-24 opacity-20 pointer-events-none">
                    <div className="h-full w-full rounded-full bg-gradient-to-b from-white/40 to-white/0" />
                  </div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <HeartIconSolid
                        className={`w-7 h-7 ${isHighRisk ? 'text-red-500' : 'text-emerald-500'}`}
                      />
                      <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isHighRisk
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {isHighRisk ? 'Higher Risk Detected' : 'Lower Risk Detected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 mt-2 relative z-10">
                    {confidenceValue !== null && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <div className="h-20 w-20 rounded-full border-4 border-white/60 shadow-inner flex items-center justify-center bg-white/70">
                            <span className="text-xl font-bold text-gray-900">
                              {confidenceValue}%
                            </span>
                          </div>
                        </div>
                        <span className="mt-2 text-[11px] font-medium uppercase tracking-wide text-gray-600">
                          Model Confidence
                        </span>
                      </div>
                    )}
                    <div className="space-y-2 text-sm text-gray-800 flex-1">
                      <p>
                        <span className="font-semibold">Prediction:</span>{' '}
                        <span>{result.prediction}</span>
                      </p>
                      <p>
                        <span className="font-semibold">Confidence detail:</span>{' '}
                        <span>{result.confidence}</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-gray-600 relative z-10">
                    This result is generated by a machine learning model trained on historical patient data. 
                    It should be used alongside, not instead of, professional clinical judgment.
                  </p>
                </Card>
              )}
            </div>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};

export default PredictForm;

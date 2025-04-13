'use client';

import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import Link from 'next/link';
// Type definition for form data
interface FormData {
  age: string;
  sex: string;
  chestPainType: string;
  restingBP: string;
  serumCholesterol: string;
  fastingBloodSugar: string;
  restingECG: string;
  maxHeartRateAchieved: string;
  exerciseInducedAngina: string;
  stDepression: string;
  slope: string;
  majorVessels: string;
  thalassemia: string;
}

const RECOMMENDATIONS = {
  'Detected': [
    { text: "Immediate medical consultation", color: "text-red-600" },
    { text: "Comprehensive cardiac evaluation", color: "text-amber-600" },
    { text: "Lifestyle and diet modification", color: "text-blue-600" }
  ],
  'Not Detected': [
    { text: "Regular cardiovascular exercise", color: "text-green-600" },
    { text: "Maintain balanced diet", color: "text-blue-600" },
    { text: "Monitor stress levels", color: "text-purple-600" }
  ]
};

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center space-x-2 text-3xl font-serif text-gray-800 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="font-semibold">HeartCare</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>
          <Link href="/predict" className="text-gray-700 hover:text-red-500 font-medium">Predict</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-red-500 font-medium">Dashboard</Link>
          <Link href="/report" className="text-gray-700 hover:text-red-500 font-medium">Reports</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-500 font-medium">Contact</Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Reusable component for displaying data fields
const DataField = React.memo(({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex justify-between items-center border-b border-gray-100 py-4 px-3 hover:bg-blue-50 rounded transition-colors">
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="font-semibold text-indigo-800 bg-indigo-50 px-3 py-1 rounded">{value || '-'}</span>
  </div>
));

DataField.displayName = 'DataField';

const Dashboard = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '', sex: '', chestPainType: '', restingBP: '', 
    serumCholesterol: '', fastingBloodSugar: '', restingECG: '',
    maxHeartRateAchieved: '', exerciseInducedAngina: '', 
    stDepression: '', slope: '', majorVessels: '', thalassemia: ''
  });
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<string | null>(null);
  const [riskScore, setRiskScore] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(searchParams.entries());

      setFormData(prev => ({ ...prev, ...params }));
      setPredictionResult(params.prediction || null);
      setConfidenceScore(params.confidence || null);
      setRiskScore(params.riskScore || null);
    }
  }, []);

  const recommendations = useMemo(() => {
    if (!predictionResult) return null;

    const recommendationType = predictionResult === "Detected" ? "Detected" : "Not Detected";
    const currentRecommendations = RECOMMENDATIONS[recommendationType] || [];

    return (
      <div className="mt-8 rounded-xl overflow-hidden shadow-md">
        <div className={`py-4 px-6 ${recommendationType === "Detected" ? "bg-red-50" : "bg-green-50"}`}>
          <h2 className={`text-xl font-semibold ${recommendationType === "Detected" ? "text-red-700" : "text-green-700"}`}>
            {recommendationType === "Detected" ? 'Critical Health Recommendations' : 'General Health Recommendations'}
          </h2>
        </div>
        <div className="bg-white p-6">
          <ul className="space-y-4">
            {currentRecommendations.map(({ text, color }, index) => (
              <li key={index} className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-').replace('600', '100')}`}>
                  <span className={`${color} font-bold`}>•</span>
                </div>
                <span className="text-gray-800 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }, [predictionResult]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Analysis Dashboard</h1>
          <p className="text-center text-gray-500 mb-10">Heart disease prediction based on patient data</p>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* Tabs */}
            <div className="flex border-b">
              {['input', 'results', 'recommendations'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium transition-colors flex-1 ${
                    activeTab === tab
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="p-8">
              {/* Input Data Tab */}
              {activeTab === 'input' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Patient Input Data</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(formData).map(([key, value]) => (
                      <DataField 
                        key={key} 
                        label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} 
                        value={value} 
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Results Tab */}
              {activeTab === 'results' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Prediction Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        label: 'Heart Disease', 
                        value: predictionResult || 'N/A',
                        color: predictionResult === 'Detected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      },
                      { 
                        label: 'Confidence', 
                        value: confidenceScore ? `${confidenceScore}%` : 'N/A',
                        color: 'bg-blue-100 text-blue-700'
                      },
                      { 
                        label: 'Risk Score', 
                        value: riskScore || 'N/A',
                        color: 'bg-purple-100 text-purple-700'
                      }
                    ].map(({ label, value, color }) => (
                      <div key={label} className="rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="text-gray-500 font-medium">{label}</div>
                        </div>
                        <div className="p-6 flex items-center justify-center">
                          <div className={`text-2xl font-bold ${color} px-4 py-2 rounded-lg`}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Recommendations</h2>
                  {recommendations || (
                    <div className="text-center py-8 text-gray-500">
                      No recommendations available without prediction results.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Quick View Summary (always visible) */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
            <h3 className="font-semibold mb-3">Quick Summary</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Status:</span>
                <div className="font-bold">{predictionResult || 'Not Analyzed'}</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Patient:</span>
                <div className="font-bold">{formData.age ? `${formData.age} yrs, ${formData.sex}` : 'N/A'}</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Risk Level:</span>
                <div className="font-bold">{riskScore || 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
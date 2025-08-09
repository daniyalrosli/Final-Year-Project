'use client';

import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';

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
    { text: "Immediate medical consultation", color: "text-red-600", icon: "🏥" },
    { text: "Comprehensive cardiac evaluation", color: "text-amber-600", icon: "💓" },
    { text: "Lifestyle and diet modification", color: "text-blue-600", icon: "🥗" }
  ],
  'Not Detected': [
    { text: "Regular cardiovascular exercise", color: "text-green-600", icon: "🏃" },
    { text: "Maintain balanced diet", color: "text-blue-600", icon: "🥗" },
    { text: "Monitor stress levels", color: "text-purple-600", icon: "🧘" }
  ]
};

// Reusable component for displaying data fields
const DataField = React.memo(({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex justify-between items-center border-b border-gray-100 py-4 px-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="font-semibold text-indigo-800 bg-indigo-50 px-3 py-2 rounded-lg">{value || '-'}</span>
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
      <div className="mt-8 rounded-xl overflow-hidden shadow-lg animate-fade-in">
        <div className={`py-6 px-8 ${recommendationType === "Detected" ? "bg-red-50" : "bg-green-50"}`}>
          <h2 className={`text-2xl font-semibold ${recommendationType === "Detected" ? "text-red-700" : "text-green-700"}`}>
            {recommendationType === "Detected" ? 'Critical Health Recommendations' : 'General Health Recommendations'}
          </h2>
        </div>
        <div className="bg-white p-8">
          <ul className="space-y-6">
            {currentRecommendations.map(({ text, color, icon }, index) => (
              <li key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${color.replace('text-', 'bg-').replace('600', '100')}`}>
                  {icon}
                </div>
                <span className="text-gray-800 font-medium text-lg">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }, [predictionResult]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar currentPage="/dashboard" />
      <div className="py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-serif">Analysis Dashboard</h1>
            <p className="text-xl text-gray-700">Heart disease prediction based on patient data</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
              {['input', 'results', 'recommendations'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 px-8 text-sm font-medium transition-all duration-300 flex-1 transition-all duration-300
                    ${activeTab === tab
                      ? 'bg-red-50 text-red-600 border-b-2 border-red-500 animate-fade-in'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="p-8 md:p-10">
              {/* Input Data Tab */}
              {activeTab === 'input' && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">Patient Input Data</h2>
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
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">Prediction Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { 
                        label: 'Heart Disease', 
                        value: predictionResult || 'N/A',
                        color: predictionResult === 'Detected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
                        icon: predictionResult === 'Detected' ? '💔' : '💚'
                      },
                      { 
                        label: 'Confidence', 
                        value: confidenceScore ? `${confidenceScore}%` : 'N/A',
                        color: 'bg-blue-100 text-blue-700',
                        icon: '📊'
                      },
                      { 
                        label: 'Risk Score', 
                        value: riskScore || 'N/A',
                        color: 'bg-purple-100 text-purple-700',
                        icon: '⚠️'
                      }
                    ].map(({ label, value, color, icon }) => (
                      <div key={label} className="rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="bg-gray-50 p-6 border-b">
                          <div className="text-gray-500 font-medium text-lg">{label}</div>
                        </div>
                        <div className="p-8 flex flex-col items-center justify-center">
                          <div className="text-4xl mb-4">{icon}</div>
                          <div className={`text-3xl font-bold ${color} px-6 py-3 rounded-lg`}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">Health Recommendations</h2>
                  {recommendations || (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">📋</div>
                      <p className="text-lg">No recommendations available without prediction results.</p>
                      <Link 
                        href="/predict" 
                        className="inline-block mt-6 px-8 py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Start Assessment
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Quick View Summary (always visible) */}
          <div className="mt-8 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
            <h3 className="font-semibold mb-6 text-xl">Quick Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Status:</span>
                <div className="font-bold text-lg">{predictionResult || 'Not Analyzed'}</div>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Patient:</span>
                <div className="font-bold text-lg">{formData.age ? `${formData.age} yrs, ${formData.sex}` : 'N/A'}</div>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Risk Level:</span>
                <div className="font-bold text-lg">{riskScore || 'Unknown'}</div>
              </div>
            </div>
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
    </div>
  );
};

export default Dashboard;
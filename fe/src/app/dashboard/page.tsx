'use client';

import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';

// Updated type definition to match your form data
interface FormData {
  age: string;
  sex: string;
  cp: string; // chest pain type
  trestbps: string; // resting blood pressure
  chol: string; // serum cholesterol
  fbs: string; // fasting blood sugar
  restecg: string; // resting ECG
  thalach: string; // max heart rate achieved
  exang: string; // exercise induced angina
  oldpeak: string; // ST depression
  slope: string; // slope of ST segment
  ca: string; // major vessels colored
  thal: string; // thalassemia
}

interface PredictionHistory {
  id: string;
  timestamp: string;
  formData: FormData;
  prediction: string;
  confidence: string;
}

const RECOMMENDATIONS = {
  'Heart Disease Detected': [
    { text: "Immediate medical consultation", color: "text-red-600", icon: "🏥" },
    { text: "Comprehensive cardiac evaluation", color: "text-amber-600", icon: "💓" },
    { text: "Lifestyle and diet modification", color: "text-blue-600", icon: "🥗" }
  ],
  'No Heart Disease': [
    { text: "Regular cardiovascular exercise", color: "text-green-600", icon: "🏃" },
    { text: "Maintain balanced diet", color: "text-blue-600", icon: "🥗" },
    { text: "Monitor stress levels", color: "text-purple-600", icon: "🧘" }
  ]
};

// Field labels mapping
const FIELD_LABELS = {
  age: 'Age',
  sex: 'Sex',
  cp: 'Chest Pain Type',
  trestbps: 'Resting Blood Pressure',
  chol: 'Serum Cholesterol',
  fbs: 'Fasting Blood Sugar',
  restecg: 'Resting ECG',
  thalach: 'Max Heart Rate Achieved',
  exang: 'Exercise Induced Angina',
  oldpeak: 'ST Depression',
  slope: 'Slope of ST Segment',
  ca: 'Major Vessels Colored',
  thal: 'Thalassemia'
};

// Helper functions to format values
const formatValue = (key: string, value: string) => {
  if (!value) return '-';
  
  const numValue = parseFloat(value);
  switch (key) {
    case 'sex':
      return numValue === 0 ? 'Female' : 'Male';
    case 'cp':
      const cpTypes = ['Typical Angina', 'Atypical Angina', 'Non-anginal Pain', 'Asymptomatic'];
      return cpTypes[numValue] || value;
    case 'fbs':
      return numValue === 1 ? '>120 mg/dL' : '≤120 mg/dL';
    case 'restecg':
      const ecgTypes = ['Normal', 'ST-T Abnormality', 'LV Hypertrophy'];
      return ecgTypes[numValue] || value;
    case 'exang':
      return numValue === 1 ? 'Yes' : 'No';
    case 'slope':
      const slopeTypes = ['Upsloping', 'Flat', 'Downsloping'];
      return slopeTypes[numValue] || value;
    case 'thal':
      const thalTypes = ['Normal', 'Fixed Defect', 'Reversible Defect'];
      return thalTypes[numValue] || value;
    case 'trestbps':
      return `${value} mm Hg`;
    case 'chol':
      return `${value} mg/dL`;
    case 'thalach':
      return `${value} BPM`;
    default:
      return value;
  }
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
    age: '', sex: '', cp: '', trestbps: '', 
    chol: '', fbs: '', restecg: '',
    thalach: '', exang: '', 
    oldpeak: '', slope: '', ca: '', thal: ''
  });
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('input');
  const [loading, setLoading] = useState(false);
  
  // Define but don't use until history feature is implemented
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get latest prediction from localStorage
      const latestPrediction = localStorage.getItem('latestHeartPrediction');
      if (latestPrediction) {
        try {
          const data = JSON.parse(latestPrediction);
          setFormData(data.formData || {});
          setPredictionResult(data.prediction || null);
          setConfidenceScore(data.confidence || null);
        } catch (error) {
          console.error('Error parsing latest prediction data:', error);
        }
      }

      // Load prediction history
      const historyData = localStorage.getItem('heartPredictionHistory');
      if (historyData) {
        try {
          const history = JSON.parse(historyData);
          setPredictionHistory(Array.isArray(history) ? history : []);
        } catch (error) {
          console.error('Error parsing prediction history:', error);
          setPredictionHistory([]);
        }
      }

      // Also check URL parameters for compatibility
      const searchParams = new URLSearchParams(window.location.search);
      const urlParams = Object.fromEntries(searchParams.entries());
      
      if (Object.keys(urlParams).length > 0) {
        setFormData(prev => ({ ...prev, ...urlParams }));
        if (urlParams.prediction) setPredictionResult(urlParams.prediction);
        if (urlParams.confidence) setConfidenceScore(urlParams.confidence);
      }
    }
  }, []);

  // Function to fetch latest prediction from API
  const refreshData = async () => {
    setLoading(true);
    try {
      // This would typically fetch from your API
      // For now, we'll just refresh from localStorage
      const latestPrediction = localStorage.getItem('latestHeartPrediction');
      if (latestPrediction) {
        const data = JSON.parse(latestPrediction);
        setFormData(data.formData || formData);
        setPredictionResult(data.prediction || null);
        setConfidenceScore(data.confidence || null);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const recommendations = useMemo(() => {
    if (!predictionResult) return null;

    const recommendationType = predictionResult.includes('Detected') || predictionResult === '1' 
      ? 'Heart Disease Detected' 
      : 'No Heart Disease';
    
    const currentRecommendations = RECOMMENDATIONS[recommendationType] || [];

    return (
      <div className="mt-8 rounded-xl overflow-hidden shadow-lg animate-fade-in">
        <div className={`py-6 px-8 ${recommendationType === 'Heart Disease Detected' ? "bg-red-50" : "bg-green-50"}`}>
          <h2 className={`text-2xl font-semibold ${recommendationType === 'Heart Disease Detected' ? "text-red-700" : "text-green-700"}`}>
            {recommendationType === 'Heart Disease Detected' ? 'Critical Health Recommendations' : 'General Health Recommendations'}
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

  const getRiskLevel = () => {
    if (!confidenceScore) return 'Unknown';
    const confidence = parseFloat(confidenceScore);
    if (predictionResult?.includes('Detected') || predictionResult === '1') {
      return confidence > 80 ? 'High Risk' : confidence > 60 ? 'Moderate Risk' : 'Low-Moderate Risk';
    }
    return confidence > 80 ? 'Low Risk' : 'Monitor';
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar currentPage="/dashboard" />
      <div className="py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-serif">Analysis Dashboard</h1>
            <p className="text-xl text-gray-700">Heart disease prediction based on patient data</p>
            <button
              onClick={refreshData}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
              {['input', 'results', 'recommendations', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 px-8 text-sm font-medium transition-all duration-300 flex-1
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
                        label={FIELD_LABELS[key as keyof typeof FIELD_LABELS] || key.toUpperCase()} 
                        value={formatValue(key, value)} 
                      />
                    ))}
                  </div>
                  {Object.values(formData).every(val => !val) && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">📊</div>
                      <p className="text-lg mb-4">No patient data available</p>
                      <Link 
                        href="/predict" 
                        className="inline-block px-8 py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300"
                      >
                        Start New Prediction
                      </Link>
                    </div>
                  )}
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
                        value: predictionResult === '1' ? 'Detected' : predictionResult === '0' ? 'Not Detected' : predictionResult || 'N/A',
                        color: (predictionResult === '1' || predictionResult?.includes('Detected')) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
                        icon: (predictionResult === '1' || predictionResult?.includes('Detected')) ? '💔' : '💚'
                      },
                      { 
                        label: 'Confidence', 
                        value: confidenceScore ? `${Math.round(parseFloat(confidenceScore))}%` : 'N/A',
                        color: 'bg-blue-100 text-blue-700',
                        icon: '📊'
                      },
                      { 
                        label: 'Risk Level', 
                        value: getRiskLevel(),
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
                  
                  {!predictionResult && (
                    <div className="text-center py-12 text-gray-500 mt-8">
                      <div className="text-6xl mb-4">🔬</div>
                      <p className="text-lg mb-4">No prediction results available</p>
                      <Link 
                        href="/predict" 
                        className="inline-block px-8 py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-300"
                      >
                        Start Prediction
                      </Link>
                    </div>
                  )}
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
              
              {/* History Tab */}
              {activeTab === 'history' && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">Prediction History</h2>
                  {predictionHistory.length > 0 ? (
                    <div className="space-y-6">
                      {predictionHistory.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-medium text-gray-800">
                              {item.prediction === '1' || item.prediction.includes('Detected') 
                                ? 'Heart Disease Detected' 
                                : 'No Heart Disease'}
                            </div>
                            <div className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <DataField label="Confidence" value={`${item.confidence}%`} />
                            <DataField label="Age" value={item.formData.age} />
                            <DataField label="Sex" value={formatValue('sex', item.formData.sex)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">📜</div>
                      <p className="text-lg mb-4">No prediction history available</p>
                      <Link 
                        href="/predict" 
                        className="inline-block px-8 py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300"
                      >
                        Make First Prediction
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Quick View Summary */}
          <div className="mt-8 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
            <h3 className="font-semibold mb-6 text-xl">Quick Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Status:</span>
                <div className="font-bold text-lg">
                  {predictionResult === '1' ? 'Heart Disease Detected' : 
                   predictionResult === '0' ? 'No Heart Disease' : 
                   predictionResult || 'Not Analyzed'}
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Patient:</span>
                <div className="font-bold text-lg">
                  {formData.age && formData.sex ? 
                    `${formData.age} yrs, ${formatValue('sex', formData.sex)}` : 'N/A'}
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <span className="opacity-75 text-sm">Risk Level:</span>
                <div className="font-bold text-lg">{getRiskLevel()}</div>
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
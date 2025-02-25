'use client';

import { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, HeartPulse, FileText, TrendingUp } from 'lucide-react';
import React from 'react';

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
    { icon: AlertTriangle, iconColor: "text-red-500", text: "Immediate medical consultation" },
    { icon: HeartPulse, iconColor: "text-yellow-500", text: "Comprehensive cardiac evaluation" },
    { icon: FileText, iconColor: "text-blue-500", text: "Lifestyle and diet modification" }
  ],
  'Not Detected': [
    { icon: TrendingUp, iconColor: "text-green-500", text: "Regular cardiovascular exercise" },
    { icon: FileText, iconColor: "text-blue-500", text: "Maintain balanced diet" },
    { icon: HeartPulse, iconColor: "text-red-500", text: "Monitor stress levels" }
  ]
};

const Navbar = () => (
  <nav className="bg-white py-4 px-8 shadow-md sticky top-0 z-10">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <HeartPulse className="text-red-500" size={30} />
        <h1 className="text-2xl font-bold text-gray-800">HeartCare</h1>
      </div>
      <div className="flex items-center space-x-6">
        {[
          { href: '/', label: 'Home' },
          { href: '/predict', label: 'Predict' },
          { href: '/report', label: 'Reports' },
          { href: '/contact', label: 'Contact' }
        ].map(({ href, label }) => (
          <a key={href} href={href} className="text-gray-700 hover:text-red-500 transition-colors duration-300">
            {label}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

// Reusable component for displaying data fields
const DataField = React.memo(({ label, value, icon: Icon }: { label: string; value?: string | null; icon?: React.ComponentType<{ className?: string; size?: number }>; }) => (
  <div className="flex justify-between items-center border-b py-3 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-3">
      {Icon && <Icon className="text-gray-500" size={20} />}
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="font-semibold text-gray-900">{value || '-'}</span>
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
      <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-md border">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className={recommendationType === "Detected" ? "text-red-500" : "text-green-500"} />
          <h2 className="text-xl font-semibold text-black">
            {recommendationType === "Detected" ? 'Critical Health Recommendations' : 'General Health Recommendations'}
          </h2>
        </div>
        <ul className="space-y-2 pl-4">
          {currentRecommendations.map(({ icon: Icon, iconColor, text }, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon className={iconColor} size={16} />
              <span className="text-black">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }, [predictionResult]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-xl border">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Analysis Dashboard</h1>

          {/* Display input data fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              <DataField 
                key={key} 
                label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} 
                value={value} 
              />
            ))}
          </div>

          {/* Prediction Results */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Results</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Prediction', value: predictionResult || 'N/A' },
                { label: 'Confidence', value: confidenceScore ? `${confidenceScore}%` : 'N/A' },
                { label: 'Risk Score', value: riskScore || 'N/A' }
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-gray-500 text-sm mb-2">{label}</div>
                  <div className="text-xl font-bold text-gray-800">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

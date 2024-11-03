// src/app/results/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/router';

const ResultsPage = () => {
  const router = useRouter();
  const { risk } = router.query; // Access the risk prediction passed from the Predict page

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Prediction Results</h1>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Risk of Heart Disease:</h2>
        <p className="text-2xl font-bold text-red-500">{(risk ? parseFloat(risk as string) * 100 : 0).toFixed(2)}%</p>
        <p className="mt-4">Based on your input, there is a <strong>{risk ? (parseFloat(risk as string) > 0.5 ? 'high' : 'low') : 'unknown'}</strong> risk of heart disease.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Recommendations:</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Consult with a healthcare professional for a thorough evaluation.</li>
          <li>Maintain a healthy diet and exercise regularly.</li>
          <li>Monitor your health metrics closely.</li>
        </ul>
      </div>
      <div className="mt-8 text-center">
        <button onClick={() => router.push('/predict')} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
          Go Back to Prediction
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
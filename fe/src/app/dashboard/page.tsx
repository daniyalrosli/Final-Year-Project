import React from "react";

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

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 p-8">
        <h1 className="text-3xl font-bold mb-6"> Dashboard</h1>
        {/* Input Summary */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Patient Input Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>Age: <span className="font-bold">45</span></div>
            <div>Sex: <span className="font-bold">Male</span></div>
            <div>Chest Pain Type: <span className="font-bold">1</span></div>
            <div>Resting BP: <span className="font-bold">145 mm Hg</span></div>
            <div>Serum Cholesterol: <span className="font-bold">260 mg/dL</span></div>
            <div>Fasting Blood Sugar: <span className="font-bold">120 mg/dL</span></div>
            <div>Resting ECG: <span className="font-bold">1</span></div>
            <div>Max Heart Rate Achieved: <span className="font-bold">150</span></div>
            <div>Exercise-Induced Angina: <span className="font-bold">Yes</span></div>
            <div>ST Depression: <span className="font-bold">1.5</span></div>
            <div>Slope of ST Segment: <span className="font-bold">1</span></div>
            <div>Major Vessels Colored: <span className="font-bold">1</span></div>
            <div>Thalassemia: <span className="font-bold">Fixed Defect</span></div>
          </div>
        </div>
        {/* Prediction Results */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Prediction Results</h2>
          <p className="mb-2">
            <span className="font-semibold">Prediction:</span> <span className="text-red-500">Heart Disease Detected</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Confidence Level:</span> 63%
          </p>
          <p>
            <span className="font-semibold">Risk Score:</span> 63%
          </p>
        </div>
        {/* Feature Contribution */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Feature Contribution Analysis</h2>
          <ul className="space-y-2">
            <li>1. Serum Cholesterol: <span className="font-bold">260 mg/dL</span></li>
            <li>2. Resting BP: <span className="font-bold">145 mm Hg</span></li>
            <li>3. ST Depression: <span className="font-bold">1.5</span></li>
          </ul>
        </div>
        {/* Next Steps */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc pl-6">
            <li>Consult a healthcare provider for further evaluation.</li>
            <li>Monitor cholesterol and blood pressure levels regularly.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
// src/app/dashboard/page.tsx

'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components you need
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div>
          <a href="/" className="mx-4 text-gray-700 hover:text-red-500">
            Home
          </a>
          <a href="/predict" className="mx-4 text-gray-700 hover:text-red-500">
            Predict
          </a>
          <a href="/report" className="mx-4 text-gray-700 hover:text-red-500">
            Reports
          </a>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Predicted Risks Over Time',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart scales properly
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicted Risks Over Time',
      },
    },
    elements: {
      point: {
        radius: 5, // Increases point size for better visibility
        hoverRadius: 7, // Increases point size on hover
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Total Patients</h2>
            <p className="text-3xl font-bold text-gray-900">120</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Predictions Made</h2>
            <p className="text-3xl font-bold text-gray-900">85</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Average Cholesterol</h2>
            <p className="text-3xl font-bold text-gray-900">200 mg/dL</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Patient Risk Predictions</h2>
          <div className="relative h-96 w-full">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Patient Puteri Mawar: Predicted Risk - High</li>
            <li>Patient Asrul Azeem: Predicted Risk - Medium</li>
            <li>Patient Haqimi Solehin: Predicted Risk - Low</li>
          </ul>
        </div>

        {/* Alerts Section */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Alerts</h2>
          <p className="text-gray-800">Alert: Patient Asrul Azeem needs immediate attention!</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
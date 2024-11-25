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
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div>
          <a href="/" className="mx-4 text-gray-700 hover:text-red-500">Home</a>
          <a href="/predict" className="mx-4 text-gray-700 hover:text-red-500">Predict</a>
          <a href="/report" className="mx-4 text-gray-700 hover:text-red-500">Reports</a>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  // Sample data for chart (You can replace this with real data from your backend)
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Predicted Risks Over Time',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Overview Metrics */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Patients</h2>
            <p className="text-3xl">120</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Predictions Made</h2>
            <p className="text-3xl">85</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Average Cholesterol</h2>
            <p className="text-3xl">200 mg/dL</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Patient Risk Predictions</h2>
          <div className="h-60">
            <Line data={data} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Predicted Risks Over Time',
                },
              },
            }} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            <li>Patient John Doe: Predicted Risk - High</li>
            <li>Patient Jane Smith: Predicted Risk - Medium</li>
            <li>Patient Alex Johnson: Predicted Risk - Low</li>
          </ul>
        </div>

        {/* Alerts Section */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow mt-4">
          <h2 className="text-xl font-semibold mb-2">Alerts</h2>
          <p>Alert: Patient Jane Smith needs immediate attention!</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
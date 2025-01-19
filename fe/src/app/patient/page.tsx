// src/app/patient/page.tsx

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

// Register chart components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">HeartCare</h1>
        <div className="flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-blue-500 transition">
            Home
          </a>
          <a href="/predict" className="text-gray-600 hover:text-blue-500 transition">
            Predict
          </a>
          <a href="/dashboard" className="text-gray-600 hover:text-blue-500 transition">
            Dashboard
          </a>
          <a href="/reports" className="text-gray-600 hover:text-blue-500 transition">
            Reports
          </a>
        </div>
      </div>
    </nav>
  );
};

const PatientPage = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Risk Score',
        data: [80, 75, 85, 90],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: '#e5e7eb' }, ticks: { color: '#9ca3af' } },
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Patient Info */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-6">
              <img
                src="/placeholder-profile.jpg"
                alt="Patient"
                className="w-16 h-16 rounded-full border border-gray-200"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
                <p className="text-sm text-gray-500">Patient ID: 12345</p>
                <p className="text-sm text-gray-500">Last Visit: 2025-01-10</p>
              </div>
            </div>
          </section>

          {/* Health Overview */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500">Risk Score</h2>
              <p className="text-2xl font-bold text-blue-600">85</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500">Blood Pressure</h2>
              <p className="text-2xl font-bold text-gray-800">130/90</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-sm font-medium text-gray-500">Cholesterol</h2>
              <p className="text-2xl font-bold text-gray-800">200</p>
            </div>
          </section>

          {/* Health Trends */}
          <section className="bg-white p-6 mt-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Risk Score Trends</h2>
            <div className="relative h-64 mt-4">
              <Line data={data} options={options} />
            </div>
          </section>

          {/* Visit History */}
          <section className="bg-white p-6 mt-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Visit History</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-800">
                  <tr>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Risk Score</th>
                    <th className="py-2 px-4">Doctor</th>
                    <th className="py-2 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">2025-01-10</td>
                    <td className="py-2 px-4">85</td>
                    <td className="py-2 px-4">Dr. Smith</td>
                    <td className="py-2 px-4">Increase physical activity</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">2024-12-20</td>
                    <td className="py-2 px-4">75</td>
                    <td className="py-2 px-4">Dr. Taylor</td>
                    <td className="py-2 px-4">Maintain current medication</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button className="bg-blue-500 text-white text-sm font-medium py-2 px-6 rounded-md shadow hover:bg-blue-600 transition">
              Edit Details
            </button>
            <button className="bg-green-500 text-white text-sm font-medium py-2 px-6 rounded-md shadow hover:bg-green-600 transition">
              Add Record
            </button>
            <button className="bg-gray-700 text-white text-sm font-medium py-2 px-6 rounded-md shadow hover:bg-gray-800 transition">
              Download Report
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatientPage;
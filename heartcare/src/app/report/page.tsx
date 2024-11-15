// src/app/reports/page.tsx

'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Registering chart components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div>
          <a href="/" className="mx-4 text-gray-700 hover:text-red-500">Home</a>
          <a href="/predict" className="mx-4 text-gray-700 hover:text-red-500">Predict</a>
          <a href="/dashboard" className="mx-4 text-gray-700 hover:text-red-500">Dashboard</a>
        </div>
      </div>
    </nav>
  );
};

const ReportPage = () => {
  const [dateRange, setDateRange] = useState('last30days');

  // Sample data for the chart (replace with real data)
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Risk Score',
        data: [70, 75, 65, 80],
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
        <h1 className="text-3xl font-bold mb-6">Reports</h1>

        {/* Filter Options */}
        <div className="mb-4">
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Date Range:</label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last60days">Last 60 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Reports</h2>
            <p className="text-3xl">150</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Average Risk Score</h2>
            <p className="text-3xl">73</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Highest Risk</h2>
            <p className="text-3xl">90</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Risk Score Trends</h2>
          <div className="h-60">
            <Line data={data} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Average Risk Score Over Time',
                },
              },
            }} />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Report Details</h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Patient ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Risk Score</th>
                <th className="px-4 py-2 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">001</td>
                <td className="border px-4 py-2">2024-11-01</td>
                <td className="border px-4 py-2">80</td>
                <td className="border px-4 py-2">High Risk</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">002</td>
                <td className="border px-4 py-2">2024-11-02</td>
                <td className="border px-4 py-2">65</td>
                <td className="border px-4 py-2">Normal</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Export Options */}
        <div className="mt-4">
          <button className="mr-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Export as CSV</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Export as PDF</button>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
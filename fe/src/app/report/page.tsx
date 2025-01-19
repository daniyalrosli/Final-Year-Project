'use client';

import React, { useState } from 'react';
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

// Registering chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div>
          <a href="/" className="mx-4 text-gray-700 hover:text-red-500">
            Home
          </a>
          <a href="/predict" className="mx-4 text-gray-700 hover:text-red-500">
            Predict
          </a>
          <a href="/dashboard" className="mx-4 text-gray-700 hover:text-red-500">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

// Main Report Page
const ReportPage = () => {
  const [dateRange, setDateRange] = useState('last30days');

  // Sample Chart Data (replace with actual data)
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Risk Score',
        data: [70, 75, 65, 80],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Average Risk Score Over Time' },
    },
    elements: {
      point: { radius: 5, hoverRadius: 7 },
    },
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">HeartCare Reports</h1>

        {/* Date Range Filter */}
        <div className="mb-6">
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
            Date Range:
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="mt-1 block w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last60days">Last 60 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Reports" value="150" />
          <SummaryCard title="Average Risk Score" value="73" />
          <SummaryCard title="Highest Risk" value="90" />
        </div>

        {/* Risk Score Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Risk Score Trends</h2>
          <div className="relative h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Details</h2>
          <Table />
        </div>

        {/* Export Buttons */}
        <div className="mt-6 flex space-x-4">
          <ExportButton label="Export as CSV" color="bg-green-500" hoverColor="hover:bg-green-600" />
          <ExportButton label="Export as PDF" color="bg-blue-500" hoverColor="hover:bg-blue-600" />
        </div>
      </div>
    </>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

// Table Component
const Table = () => {
  return (
    <table className="min-w-full table-auto text-gray-800">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left font-medium">Patient ID</th>
          <th className="px-4 py-2 text-left font-medium">Date</th>
          <th className="px-4 py-2 text-left font-medium">Risk Score</th>
          <th className="px-4 py-2 text-left font-medium">Comments</th>
        </tr>
      </thead>
      <tbody>
        <TableRow id="001" date="2024-11-01" score="80" comment="High Risk" />
        <TableRow id="002" date="2024-11-02" score="65" comment="Normal" />
      </tbody>
    </table>
  );
};

// Table Row Component
const TableRow = ({
  id,
  date,
  score,
  comment,
}: {
  id: string;
  date: string;
  score: string;
  comment: string;
}) => {
  return (
    <tr>
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{date}</td>
      <td className="border px-4 py-2">{score}</td>
      <td className="border px-4 py-2">{comment}</td>
    </tr>
  );
};

// Export Button Component
const ExportButton = ({
  label,
  color,
  hoverColor,
}: {
  label: string;
  color: string;
  hoverColor: string;
}) => {
  return (
    <button className={`${color} text-white py-2 px-4 rounded-md ${hoverColor}`}>
      {label}
    </button>
  );
};

export default ReportPage;
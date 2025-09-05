'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/navbar';

// Dynamically import Chart.js components
const LineChart = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  { ssr: false }
);

interface LatestPrediction {
  formData: Record<string, string>;
  prediction: string;
  confidence: string;
  timestamp: string;
  id: string;
  liked?: boolean;
}

const ReportPage = () => {
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);
  const [latest, setLatest] = useState<LatestPrediction | null>(null);

  // Fetch latest prediction from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const latestRaw = localStorage.getItem('latestHeartPrediction');
      if (latestRaw) {
        try {
          setLatest(JSON.parse(latestRaw));
        } catch {
          setLatest(null);
        }
      }
    }
  }, []);

  // PDF export logic unchanged
  const generatePDF = async () => {
    if (typeof window === 'undefined') return false;
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      const element = reportRef.current;
      if (!element) throw new Error('Report element not found');
      const canvas = await html2canvas(element, { logging: false, useCORS: true, background: '#ffffff' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`HeartCare_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      return true;
    } catch (error) {
      console.error('PDF generation failed:', error);
      return false;
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    await generatePDF();
    setIsExporting(false);
  };

  // Chart data (demo)
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Risk Score',
      data: [70, 75, 65, 80],
      borderColor: 'rgb(220, 38, 38)',
      backgroundColor: 'rgba(220, 38, 38, 0.08)',
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: 'rgb(220, 38, 38)',
      pointBorderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Risk Score Trends' }
    },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } }
    }
  };

  // Conclusion logic
  const getConclusion = () => {
    if (!latest) return null;
    const { prediction, confidence } = latest;
    const conf = parseFloat(confidence);
    if (prediction === '1' || prediction?.toLowerCase().includes('detected')) {
      if (conf > 80) return (
        <div className="text-red-700 font-bold text-lg">
          ⚠️ High risk of heart disease detected. Immediate medical consultation is strongly recommended.
        </div>
      );
      if (conf > 60) return (
        <div className="text-amber-700 font-semibold text-lg">
          ⚠️ Moderate risk detected. Please consult your healthcare provider soon.
        </div>
      );
      return (
        <div className="text-yellow-700 font-medium text-lg">
          ⚠ Low-moderate risk detected. Consider lifestyle changes and regular checkups.
        </div>
      );
    } else if (prediction === '0' || prediction?.toLowerCase().includes('no heart disease')) {
      return (
        <div className="text-green-700 font-bold text-lg">
          ✅ No heart disease detected. Keep up your healthy lifestyle!
        </div>
      );
    }
    return (
      <div className="text-gray-700 font-medium text-lg">
        No clear conclusion. Please try again or consult a professional.
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar currentPage="/report" />
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">HeartCare Health Report</h1>
          <p className="text-xl text-gray-700">Comprehensive health analysis and insights</p>
        </div>
        <div className="flex justify-center mb-8">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <span className="mr-2">⬇</span>
            {isExporting ? 'Generating PDF...' : 'Export Report'}
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10" ref={reportRef}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Risk Assessment Report</h1>
            <p className="text-gray-500 text-lg">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          {/* Latest Prediction Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Prediction</h2>
            {latest ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-gray-700 mb-2"><strong>Prediction:</strong> {latest.prediction}</div>
                  <div className="text-gray-700 mb-2"><strong>Confidence:</strong> {latest.confidence}%</div>
                  <div className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(latest.timestamp).toLocaleString()}</div>
                  <div className="text-gray-700 mb-2"><strong>Liked:</strong> {latest.liked ? 'Yes ❤️' : 'No'}</div>
                </div>
                <div>
                  <div className="text-gray-700 mb-2"><strong>Patient Info:</strong></div>
                  <ul className="text-gray-600 ml-4">
                    {Object.entries(latest.formData).map(([key, value]) => (
                      <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No prediction data available. Please make a prediction first.</div>
            )}
            {/* Conclusion */}
            <div className="mt-6">
              {getConclusion()}
            </div>
          </div>
          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="h-96">
              {chartData && chartOptions && (
                <LineChart data={chartData} options={chartOptions} />
              )}
            </div>
          </div>
          {/* Patient Table Section (demo) */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Analysis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tl-lg">Patient ID</th>
                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Factors</th>
                    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider rounded-tr-lg">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { id: 'P001', risk: 'High', riskClass: 'text-red-600 font-medium', factors: 'Age, Blood Pressure', recommendation: 'Immediate consultation' },
                    { id: 'P002', risk: 'Moderate', riskClass: 'text-yellow-600 font-medium', factors: 'Cholesterol', recommendation: 'Dietary changes' },
                    { id: 'P003', risk: 'Low', riskClass: 'text-green-600 font-medium', factors: 'Family History', recommendation: 'Regular checkups' },
                    { id: 'P004', risk: 'High', riskClass: 'text-red-600 font-medium', factors: 'Smoking, Obesity', recommendation: 'Lifestyle intervention' },
                  ].map((patient, index) => (
                    <tr key={patient.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${patient.riskClass}`}>{patient.risk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.factors}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">This report is automatically generated and should be reviewed by a healthcare professional.</p>
              <p className="text-sm text-gray-400 mt-1">© 2025 HeartCare Health Systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

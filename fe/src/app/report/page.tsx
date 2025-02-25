'use client';

import React, { useRef, useState } from 'react';
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
import { Download, Printer, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from "next/link";


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const ReportPage = () => {
  const [isExporting, setIsExporting] = useState(false);

  const reportRef = useRef(null);

  const generatePDF = async () => {
    setIsExporting(true);
  
    
    try {
      const element = reportRef.current;
      if (!element) throw new Error('Report element not found');
      
      const canvas = await html2canvas(element, {
        logging: false,
        useCORS: true,
        background: '#f9fafb'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`HeartCare_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch {
   
    } finally {
      setIsExporting(false);
    }
  };

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Risk Score',
      data: [70, 75, 65, 80],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { font: { family: 'Inter' } }
      },
      title: {
        display: true,
        text: 'Risk Score Trends',
        font: { size: 16, family: 'Inter', weight: 700 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
      x: {
        grid: { display: false },
      }
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
             <div className="flex-shrink-0 flex items-center">
  <Link href="/" className="text-2xl font-bold text-red-500">
    HeartCare
  </Link>
</div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={generatePDF}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

     
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8" ref={reportRef}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Health Risk Assessment Report</h1>
              <p className="text-gray-500 mt-2">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="Total Assessments" value="150" trend="+12%" />
              <StatCard title="Average Risk Score" value="73" trend="-5%" />
              <StatCard title="High Risk Cases" value="32" trend="+8%" />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="h-96">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Analysis</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Factors</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 'P001', risk: 'High', factors: 'Age, Blood Pressure', recommendation: 'Immediate consultation' },
                      { id: 'P002', risk: 'Moderate', factors: 'Cholesterol', recommendation: 'Dietary changes' },
                    ].map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.risk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.factors}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      <p className={`ml-2 text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {trend}
      </p>
    </div>
  </div>
);

export default ReportPage;
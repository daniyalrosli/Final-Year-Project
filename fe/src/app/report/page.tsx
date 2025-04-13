'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically import Chart.js components
const LineChart = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  { ssr: false }
);

// Dynamically import PDF generation dependencies
interface GeneratePDFProps {
  reportRef: React.RefObject<HTMLDivElement>;
}

const generatePDF = async ({ reportRef }: GeneratePDFProps): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Dynamically import libraries only on client-side
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;
    
    const element = reportRef.current;
    if (!element) throw new Error('Report element not found');
    
    const canvas = await html2canvas(element, {
      logging: false,
      useCORS: true,
      background: '#ffffff'
    });
    
    const imgWidth = 210; // A4 width in mm
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

const ReportPage = () => {
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);
  // Removed unused chartInstance state

  // Register Chart.js on client-side only
  useEffect(() => {
    const registerChart = async () => {
      if (typeof window !== 'undefined') {
        const { Chart, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } = 
          await import('chart.js');
        
        Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
      }
    };
    
    registerChart();
  }, []);

  const handleExportPDF = async () => {
    setIsExporting(true);
    await generatePDF({ reportRef });
    setIsExporting(false);
  };

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
      legend: {
        position: 'top' as const,
        labels: { 
          font: { 
            family: "'Poppins', sans-serif",
            size: 12,
            weight: 700 
          },
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Risk Score Trends',
        font: { 
          size: 18, 
          family: "'Poppins', sans-serif", 
          weight: "bold" 
        },
        padding: {
          bottom: 30
        },
        color: '#1f2937'
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Poppins', sans-serif",
          weight: 600
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.04)' },
        border: { dash: [4, 4] },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#6b7280'
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#6b7280'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        h1, h2, h3, .brand-text, .nav-links {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <nav className="bg-white border-b border-gray-100 fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-red-600 tracking-tight hover:text-red-700 transition-colors">
                  HeartCare
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
              >
                <span className="mr-2">⬇</span>
                {isExporting ? 'Generating PDF...' : 'Export Report'}
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <span className="text-xl">🖨️</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <span className="text-xl">🔗</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-4" ref={reportRef}>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Risk Assessment Report</h1>
              <p className="text-gray-500 text-lg">Generated on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="Total Assessments" value="150" trend="+12%" />
              <StatCard title="Average Risk Score" value="73" trend="-5%" />
              <StatCard title="High Risk Cases" value="32" trend="+8%" />
            </div>

   <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
  <div className="h-96">
    {chartData && chartOptions && (
      <LineChart data={chartData} options={chartOptions} />
    )}
  </div>
</div>

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
      </main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium ${
          isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {trend}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
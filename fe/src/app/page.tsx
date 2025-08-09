'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Navbar from './components/navbar';

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
    >
      <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
      <div className="flex-shrink-0">
        {isOpen ? (
          <HiChevronUp className="w-5 h-5 text-red-500" />
        ) : (
          <HiChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </button>
    {isOpen && (
      <div className="px-4 pb-6">
        <p className="text-gray-700 leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqData = [
    {
      question: "What is HeartCare and how does it work?",
      answer: "HeartCare is an AI-powered platform that analyzes your health data to assess heart disease risk. Simply input your medical information, and our advanced algorithms provide instant predictions and personalized recommendations for maintaining heart health."
    },
    {
      question: "How accurate are the heart disease predictions?",
      answer: "Our predictions are based on validated medical research and machine learning models trained on extensive datasets. While we maintain high accuracy rates, our predictions are meant to complement, not replace, professional medical advice. Always consult with healthcare providers for medical decisions."
    },
    {
      question: "What information do I need to provide for the assessment?",
      answer: "The assessment requires basic demographic information (age, gender), clinical measurements (blood pressure, cholesterol levels, BMI), and lifestyle factors (smoking status, exercise habits). All data is kept confidential and secure."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Absolutely. We prioritize your privacy and security. All data is encrypted, stored securely, and never shared with third parties without your explicit consent. We comply with healthcare data protection regulations and industry best practices."
    },
    {
      question: "Can I use HeartCare if I don't have recent medical tests?",
      answer: "While recent medical data provides the most accurate results, you can still use HeartCare with estimated values. However, we recommend getting regular check-ups and using actual medical data for the most reliable assessments."
    },
    {
      question: "What should I do if the assessment shows high risk?",
      answer: "If you receive a high-risk assessment, don't panic. This is a screening tool, not a diagnosis. We recommend scheduling an appointment with your healthcare provider to discuss the results and get professional medical evaluation."
    },
    {
      question: "How often should I use the heart health assessment?",
      answer: "We recommend using the assessment every 3-6 months, or whenever your health status changes significantly. Regular monitoring helps track your heart health trends and identify potential issues early."
    },
    {
      question: "Is HeartCare suitable for all age groups?",
      answer: "HeartCare is designed for adults aged 18 and above. The assessment models are optimized for adult populations. For children and adolescents, please consult with pediatric healthcare providers for appropriate heart health monitoring."
    },
    {
      question: "Can I export my health reports and share them with my doctor?",
      answer: "Yes! You can generate detailed health reports and export them as PDF files. These reports include your assessment results, trends, and recommendations that you can share with your healthcare provider during appointments."
    },
    {
      question: "What makes HeartCare different from other health apps?",
      answer: "HeartCare combines medical expertise with cutting-edge AI technology, focusing specifically on cardiovascular health. Our platform provides evidence-based insights, personalized recommendations, and comprehensive reporting that helps you and your healthcare team make informed decisions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar currentPage="/" />
      
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center lg:justify-start">
            <Image
              src="/img/OrgCoral_Med-04_Concept-01.jpg"
              alt="HeartCare Illustration"
              width={420}
              height={420}
              className="w-full max-w-sm lg:max-w-md rounded-2xl border-4 border-white shadow-lg transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 animate-fade-in">
              Empowering Your Heart Health
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-serif animate-fade-in">
              Welcome to <span className="text-red-500">HeartCare</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 font-light animate-fade-in">
              Your Trusted Partner in Heart Health
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0 animate-fade-in">
              HeartCare is a web-based platform designed to empower you in managing and understanding your heart health. Our user-friendly application offers personalized insights to help you make informed decisions about your well-being.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/predict" 
                className="inline-block px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 focus:ring-red-200 focus:outline-none animate-bounce"
              >
                Try Heart Prediction
              </Link>
              <Link 
                href="/about" 
                className="inline-block px-8 py-4 bg-white text-red-500 text-lg font-semibold rounded-xl shadow-lg border-2 border-red-500 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 focus:ring-red-200 focus:outline-none"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4 animate-fade-in">
              Why Choose HeartCare?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in">
              Our platform combines technology with medical expertise to provide you with the best heart health management experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group animate-fade-in">
              <div className="bg-red-100 p-5 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Insights</h3>
              <p className="text-gray-700">
                Tailored analytics to help you monitor your heart health and detect potential risks early.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group animate-fade-in delay-200">
              <div className="bg-red-100 p-5 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Monitoring</h3>
              <p className="text-gray-700">
                Access real-time data and visualize your progress with our interactive dashboards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group animate-fade-in delay-400">
              <div className="bg-red-100 p-5 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Guidance</h3>
              <p className="text-gray-700">
                Built with input from healthcare professionals to ensure accurate and reliable insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Get answers to common questions about HeartCare and heart health monitoring.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="inline-block px-8 py-4 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 focus:ring-4 focus:ring-red-200 focus:outline-none"
              >
                Contact Us
              </Link>
              <Link 
                href="/about" 
                className="inline-block px-8 py-4 bg-white text-red-500 font-semibold rounded-xl shadow-lg border-2 border-red-500 hover:bg-red-50 transition-all duration-300 focus:ring-4 focus:ring-red-200 focus:outline-none"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-12 rounded-2xl text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Take Control of Your Heart Health Today</h2>
            <p className="text-xl mt-4 max-w-2xl mx-auto opacity-90 mb-8">
              With HeartCare, you can stay proactive in preventing heart disease and maintaining a healthy lifestyle. 
              Join our community of users committed to better heart health!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/predict" 
                className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 text-lg focus:ring-4 focus:ring-red-200 focus:outline-none transform hover:-translate-y-1"
              >
                Get Started Now
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-block px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-300 text-lg focus:ring-4 focus:ring-red-200 focus:outline-none transform hover:-translate-y-1"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto border-t border-gray-200 mt-12 pt-8 pb-8 text-center text-gray-500 text-sm px-6 md:px-8">
        <p>&copy; {new Date().getFullYear()} HeartCare. All rights reserved.</p>
      </footer>

      {/* Font imports and animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-serif: 'Playfair Display', Georgia, Cambria, serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: var(--font-sans);
          line-height: 1.6;
        }
        
        .font-serif {
          font-family: var(--font-serif);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in.delay-200 {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        
        .animate-fade-in.delay-400 {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
      `}</style>
    </div>
  );
}
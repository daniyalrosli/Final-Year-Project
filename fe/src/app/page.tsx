// page.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from './components/navbar';
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  ChartBarIcon as AnalyticsIcon,
  ShieldCheckIcon as ShieldIcon,
  BoltIcon as ActivityIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full py-5 px-4 text-left flex justify-between items-center hover:bg-gray-50 transition focus:outline-none"
    >
      <span className="text-base font-medium text-gray-900">{question}</span>
      <span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-red-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        )}
      </span>
    </button>
    {isOpen && (
      <div className="px-4 pb-5">
        <p className="text-gray-700 text-sm">{answer}</p>
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
      <section className="py-16 px-4 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col items-start justify-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold">
            <HeartIconSolid className="w-4 h-4" />
            Empowering Your Heart Health
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
            Welcome to <span className="text-red-500">HeartCare</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-xl">
            HeartCare is a web-based platform designed to empower you in managing and understanding your heart health. Our user-friendly application offers personalized insights to help you make informed decisions about your well-being.
          </p>
          <div className="flex gap-4 mt-2">
            <Link 
              href="/predict" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-xl shadow hover:bg-red-600 transition"
            >
              Try Heart Prediction
              <HeartIconSolid className="w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-500 border border-red-500 text-base font-semibold rounded-xl shadow hover:bg-red-50 transition"
            >
              Learn More
              <AnalyticsIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/img/OrgCoral_Med-04_Concept-01.jpg"
            alt="HeartCare Illustration"
            width={400}
            height={400}
            className="rounded-2xl shadow-xl border border-gray-100"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <ActivityIcon className="w-4 h-4" />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
              Why Choose HeartCare?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with medical expertise to provide you with the best heart health management experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <HeartIconSolid className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Personalized Insights</h3>
              <p className="text-gray-600 text-sm">
                Tailored analytics to help you monitor your heart health and detect potential risks early with AI-powered recommendations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <ActivityIcon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Real-Time Monitoring</h3>
              <p className="text-gray-600 text-sm">
                Access real-time data and visualize your progress with our interactive dashboards and comprehensive health tracking.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <ShieldIcon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">
                Built with input from healthcare professionals to ensure accurate and reliable insights backed by medical research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <ShieldIcon className="w-4 h-4" />
              Support Center
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600">
              Get answers to common questions about HeartCare and heart health monitoring.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow border border-gray-100 overflow-hidden">
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
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-6 text-base">
              Still have questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacts" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition"
              >
                Contact Us
                <HeartIconSolid className="w-5 h-5" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-500 font-semibold rounded-xl shadow border border-red-500 hover:bg-red-50 transition"
              >
                Learn More About Us
                <AnalyticsIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 p-10 rounded-2xl text-center text-white shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <HeartIconSolid className="w-4 h-4" />
              Start Your Journey
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-serif">Take Control of Your Heart Health Today</h2>
            <p className="text-lg mb-8">
              With HeartCare, you can stay proactive in preventing heart disease and maintaining a healthy lifestyle. 
              Join our community of users committed to better heart health!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/predict" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
              >
                Get Started Now
                <HeartIconSolid className="w-5 h-5" />
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-semibold rounded-xl border border-white hover:bg-white hover:text-red-600 transition"
              >
                View Dashboard
                <AnalyticsIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto border-t border-gray-100 mt-12 pt-8 pb-8 text-center text-gray-400 text-xs px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HeartIconSolid className="w-5 h-5 text-red-500" />
          <span className="font-semibold text-gray-700">HeartCare</span>
        </div>
        <p>&copy; {new Date().getFullYear()} HeartCare. All rights reserved.</p>
      </footer>

      {/* Font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        :root {
          --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-serif: 'Playfair Display', Georgia, Cambria, serif;
        }
        body {
          font-family: var(--font-sans);
        }
        .font-serif {
          font-family: var(--font-serif);
        }
      `}</style>
    </div>
  );
}

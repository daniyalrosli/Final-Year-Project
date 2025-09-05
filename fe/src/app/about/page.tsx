// about/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  BoltIcon as LightningBoltIcon
} from '@heroicons/react/24/outline';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ target, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span className="text-3xl md:text-4xl font-bold text-red-500">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

interface InteractiveCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClick: () => void;
}

const InteractiveCard = ({ icon: Icon, title, description, onClick }: InteractiveCardProps) => (
  <div
    className="bg-white rounded-xl p-6 shadow hover:shadow-md cursor-pointer transition-all border border-gray-100 hover:border-red-200"
    onClick={onClick}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-lg bg-gray-100">
        <Icon className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
    setShowContactForm(false);
  };

  const handleCardClick = (action: string) => {
    switch (action) {
      case 'predict':
        window.location.href = '/predict';
        break;
      case 'dashboard':
        window.location.href = '/dashboard';
        break;
      case 'contact':
        setShowContactForm(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar currentPage="/about" />
      
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Welcome to HeartCare</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
          Your partner in heart health monitoring and management through innovative technology and personalized insights.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => handleCardClick('predict')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Start Prediction
          </button>
          <button 
            onClick={() => handleCardClick('dashboard')}
            className="bg-white text-red-500 px-6 py-3 rounded-lg font-medium border border-red-500 hover:bg-red-50 transition"
          >
            View Dashboard
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <AnimatedCounter target={10000} suffix="+" />
              <p className="text-gray-600 mt-2">Users Served</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={95} suffix="%" />
              <p className="text-gray-600 mt-2">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={24} suffix="/7" />
              <p className="text-gray-600 mt-2">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InteractiveCard
              icon={LightningBoltIcon}
              title="AI-Powered Predictions"
              description="Get instant heart health predictions using our advanced machine learning algorithms."
              onClick={() => handleCardClick('predict')}
            />
            <InteractiveCard
              icon={ChartBarIcon}
              title="Personalized Dashboard"
              description="Track your heart health metrics and view detailed analytics in real-time."
              onClick={() => handleCardClick('dashboard')}
            />
            <InteractiveCard
              icon={ShieldCheckIcon}
              title="Expert Support"
              description="Connect with our team of healthcare professionals for personalized guidance."
              onClick={() => handleCardClick('contact')}
            />
          </div>
        </div>
      </section>

      {/* About Tabs Section */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-gray-50 rounded-xl shadow p-8">
          <div className="flex gap-2 mb-6">
            {['mission', 'vision', 'values'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-red-50'
                }`}
              >
                {`Our ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
              </button>
            ))}
          </div>
          <div>
            {activeTab === 'mission' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  To empower individuals with the knowledge and tools needed to take control of their heart health, 
                  prevent disease, and improve quality of life through innovative technology and personalized care.
                </p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  A world where heart disease prevention is accessible to everyone, where early detection saves lives, 
                  and where technology bridges the gap between healthcare and personal wellness.
                </p>
              </div>
            )}
            {activeTab === 'values' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <ul className="text-gray-700 text-base leading-relaxed space-y-2 list-disc pl-5">
                  <li><strong>Innovation:</strong> Continuously improving our technology and services</li>
                  <li><strong>Accessibility:</strong> Making heart health monitoring available to all</li>
                  <li><strong>Accuracy:</strong> Providing reliable and precise health insights</li>
                  <li><strong>Privacy:</strong> Protecting your health data with the highest security standards</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-gray-50 rounded-xl shadow p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h3>
          {!showContactForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div 
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition"
                  onClick={() => navigator.clipboard.writeText('info@heartcare.com')}
                >
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-red-500">info@heartcare.com</p>
                  <p className="text-sm text-gray-500">Click to copy</p>
                </div>
                <div 
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition"
                  onClick={() => navigator.clipboard.writeText('(123) 456-7890')}
                >
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-red-500">(123) 456-7890</p>
                  <p className="text-sm text-gray-500">Click to copy</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-red-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Send us a Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="max-w-3xl mx-auto border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs px-4">
        <p>© {new Date().getFullYear()} HeartCare. All rights reserved.</p>
      </footer>
    </div>
  );
}

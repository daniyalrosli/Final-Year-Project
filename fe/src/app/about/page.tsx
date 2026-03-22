// about/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Layout, Container, Section, Grid } from "@/components/ui/layout";
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  BoltIcon as LightningBoltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
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
    className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-100 group-hover:to-red-200 transition-all">
        <Icon className="w-6 h-6 text-red-500" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
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
    <Layout>
      <Navbar currentPage="/about" />

      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-white via-gray-50 to-white">
        <Container size="lg" className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-semibold mb-6 transform hover:scale-105 transition-transform">
              <HeartIconSolid className="w-4 h-4" />
              About HeartCare
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Your partner in <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">proactive</span> heart health
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              HeartCare combines clinically informed models with intuitive dashboards to help you monitor, understand, and act on your heart health data.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => handleCardClick('predict')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Risk Assessment
              </button>
              <button 
                onClick={() => handleCardClick('dashboard')}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section id="stats-section" className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 md:py-24">
        <Container size="lg">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Our Impact at a Glance</h2>
            <Grid cols={3} gap="lg">
              <div className="text-center space-y-3 p-6 rounded-2xl bg-white bg-opacity-5 backdrop-blur border border-white border-opacity-10 hover:bg-opacity-10 transition-all">
                <AnimatedCounter target={10000} suffix="+" />
                <p className="text-gray-300 text-sm leading-relaxed">Individuals supported on their heart health journey</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-2xl bg-white bg-opacity-5 backdrop-blur border border-white border-opacity-10 hover:bg-opacity-10 transition-all">
                <AnimatedCounter target={95} suffix="%" />
                <p className="text-gray-300 text-sm leading-relaxed">Model accuracy on validation datasets</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-2xl bg-white bg-opacity-5 backdrop-blur border border-white border-opacity-10 hover:bg-opacity-10 transition-all">
                <AnimatedCounter target={24} suffix="/7" />
                <p className="text-gray-300 text-sm leading-relaxed">Availability of insights and monitoring</p>
              </div>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-24">
        <Container size="lg">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">What You Can Do with HeartCare</h2>
            <p className="text-base text-gray-600 text-center max-w-2xl mx-auto mb-14">
              Designed to help you understand your heart health through <span className="text-red-600 font-semibold">rapid predictions</span>, <span className="text-red-600 font-semibold">meaningful insights</span>, and <span className="text-red-600 font-semibold">expert alignment</span>.
            </p>
            <Grid cols={3} gap="lg">
              <InteractiveCard
                icon={LightningBoltIcon}
                title="AI-Powered Predictions"
                description="Run fast, evidence-informed risk assessments that highlight when your heart health may need attention."
                onClick={() => handleCardClick('predict')}
              />
              <InteractiveCard
                icon={ChartBarIcon}
                title="Personalized Dashboard"
                description="Track key metrics over time, spot trends early, and bring clear insights to your appointments."
                onClick={() => handleCardClick('dashboard')}
              />
              <InteractiveCard
                icon={ShieldCheckIcon}
                title="Expert-Aligned Design"
                description="Developed with healthcare professionals to keep insights clinically meaningful and easy to understand."
                onClick={() => handleCardClick('contact')}
              />
            </Grid>
          </div>
        </Container>
      </Section>

      {/* About Tabs Section */}
      <Section className="bg-white py-16 md:py-24">
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-50 rounded-2xl p-8 border border-red-100">
              <div className="flex flex-wrap gap-2 mb-8">
                {['mission', 'vision', 'values'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="min-h-40">
                {activeTab === 'mission' && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      To empower individuals with the knowledge and tools needed to take control of their heart health, prevent disease, and improve quality of life through innovative technology and personalized care.
                    </p>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      A world where heart disease prevention is accessible to everyone, where early detection saves lives, and where technology bridges the gap between healthcare and personal wellness.
                    </p>
                  </div>
                )}
                {activeTab === 'values' && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h3>
                    <ul className="text-gray-700 text-base leading-relaxed space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Innovation</strong>
                          <p className="text-gray-600 text-sm">Continuously improving our technology and services</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Accessibility</strong>
                          <p className="text-gray-600 text-sm">Making heart health monitoring available to all</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Accuracy</strong>
                          <p className="text-gray-600 text-sm">Providing reliable and precise health insights</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Privacy</strong>
                          <p className="text-gray-600 text-sm">Protecting your health data with highest security standards</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-24">
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-lg">
              <h3 className="text-3xl font-bold mb-3 text-center text-gray-900">Get in Touch</h3>
              <p className="text-gray-600 text-center mb-10">
                Have feedback or collaboration ideas? We&apos;d love to hear from you.
              </p>
              {!showContactForm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div 
                    className="p-6 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigator.clipboard.writeText('info@heartcare.com')}
                  >
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Email Us</h4>
                    <p className="text-red-600 font-semibold mb-1">info@heartcare.com</p>
                    <p className="text-xs text-gray-500">Click to copy</p>
                  </div>
                  <div 
                    className="p-6 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigator.clipboard.writeText('(123) 456-7890')}
                  >
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Call Us</h4>
                    <p className="text-red-600 font-semibold mb-1">(123) 456-7890</p>
                    <p className="text-xs text-gray-500">Click to copy</p>
                  </div>
                </div>
              ) : null}
              {!showContactForm ? (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send us a Message
                </button>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <Container size="lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <HeartIconSolid className="w-5 h-5 text-red-500" />
              <p className="font-semibold text-gray-900">HeartCare</p>
            </div>
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} HeartCare. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-red-600 transition">Privacy</a>
              <a href="#" className="hover:text-red-600 transition">Terms</a>
              <a href="#" className="hover:text-red-600 transition">Contact</a>
            </div>
          </div>
        </Container>
      </footer>
    </Layout>
  );
}

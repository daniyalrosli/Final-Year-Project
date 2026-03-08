// about/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Layout, Container, Section, Card, Grid } from "@/components/ui/layout";
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  BoltIcon as LightningBoltIcon
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
    <Layout>
      <Navbar currentPage="/about" />

      {/* Hero Section */}
      <Section className="bg-white">
        <Container size="lg" className="py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <HeartIconSolid className="w-4 h-4" />
              About HeartCare
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-black">
              Your partner in proactive heart health
            </h1>
            <p className="text-base md:text-lg text-black leading-relaxed mb-8">
              HeartCare combines clinically informed models with intuitive dashboards to help you monitor, understand,
              and act on your heart health data before problems arise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleCardClick('predict')}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Start a Risk Assessment
              </button>
              <button 
                onClick={() => handleCardClick('dashboard')}
                className="bg-white text-red-500 px-6 py-3 rounded-lg font-medium border border-red-500 hover:bg-red-50 transition"
              >
                View Your Dashboard
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section id="stats-section" className="bg-gray-50">
        <Container size="lg">
          <Card padding="lg" shadow="lg" className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 text-black">Our Impact at a Glance</h2>
            <Grid cols={3} gap="lg">
              <div className="text-center space-y-2">
                <AnimatedCounter target={10000} suffix="+" />
                <p className="text-gray-600 text-sm">Individuals supported on their heart health journey</p>
              </div>
              <div className="text-center space-y-2">
                <AnimatedCounter target={95} suffix="%" />
                <p className="text-gray-600 text-sm">Model accuracy on validation datasets</p>
              </div>
              <div className="text-center space-y-2">
                <AnimatedCounter target={24} suffix="/7" />
                <p className="text-gray-600 text-sm">Availability of insights and monitoring</p>
              </div>
            </Grid>
          </Card>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-white">
        <Container size="lg">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 text-black">What You Can Do with HeartCare</h2>
            <p className="text-sm md:text-base text-black text-center max-w-2xl mx-auto mb-8">
              HeartCare is designed around three pillars: rapid risk prediction, meaningful visualization of trends,
              and secure collaboration with healthcare professionals.
            </p>
            <Grid cols={3} gap="lg">
              <InteractiveCard
                icon={LightningBoltIcon}
                title="AI-Powered Predictions"
                description="Run fast, evidence-informed risk assessments that highlight when your heart health may need extra attention."
                onClick={() => handleCardClick('predict')}
              />
              <InteractiveCard
                icon={ChartBarIcon}
                title="Personalized Dashboard"
                description="Track key metrics over time, spot trends early, and bring a clear summary to your clinical appointments."
                onClick={() => handleCardClick('dashboard')}
              />
              <InteractiveCard
                icon={ShieldCheckIcon}
                title="Expert-Aligned Design"
                description="Developed with input from healthcare professionals to keep insights clinically meaningful and easy to interpret."
                onClick={() => handleCardClick('contact')}
              />
            </Grid>
          </div>
        </Container>
      </Section>

      {/* About Tabs Section */}
      <Section className="bg-gray-50">
        <Container size="md">
          <Card padding="lg" shadow="lg">
            <div className="flex flex-wrap gap-2 mb-6">
              {['mission', 'vision', 'values'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
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
                  <h3 className="text-xl font-semibold mb-3 text-black">Our Mission</h3>
                <p className="text-black text-sm md:text-base leading-relaxed">
                    To empower individuals with the knowledge and tools needed to take control of their heart health, 
                    prevent disease, and improve quality of life through innovative technology and personalized care.
                  </p>
                </div>
              )}
              {activeTab === 'vision' && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-black text-sm md:text-base leading-relaxed">
                    A world where heart disease prevention is accessible to everyone, where early detection saves lives, 
                    and where technology bridges the gap between healthcare and personal wellness.
                  </p>
                </div>
              )}
              {activeTab === 'values' && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                  <ul className="text-black text-sm md:text-base leading-relaxed space-y-2 list-disc pl-5">
                    <li><strong>Innovation:</strong> Continuously improving our technology and services.</li>
                    <li><strong>Accessibility:</strong> Making heart health monitoring available to all.</li>
                    <li><strong>Accuracy:</strong> Providing reliable and precise health insights.</li>
                    <li><strong>Privacy:</strong> Protecting your health data with the highest security standards.</li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-white">
        <Container size="md">
          <Card padding="lg" shadow="lg">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black">Get in Touch</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Have feedback or collaboration ideas? Reach out directly or send us a short message below.
            </p>
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
                    className="bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition"
                  >
                    Send us a Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </Card>
        </Container>
      </Section>

      <footer className="border-t border-gray-100 mt-8 py-6 text-center text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} HeartCare. All rights reserved.</p>
      </footer>
    </Layout>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HiHeart, HiOutlineMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 md:px-8 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with HeartPulse Icon */}
        <div className="flex items-center space-x-2">
          <HiHeart className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-serif font-bold text-gray-800">HeartCare</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium text-gray-800 hover:text-red-500 transition-colors duration-300">Home</Link>
          <Link href="/predict" className="font-medium text-gray-800 hover:text-red-500 transition-colors duration-300">Predict</Link>
          <Link href="/dashboard" className="font-medium text-gray-800 hover:text-red-500 transition-colors duration-300">Dashboard</Link>
          <Link href="/reports" className="font-medium text-gray-800 hover:text-red-500 transition-colors duration-300">Reports</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          >
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-4 space-y-2">
          <Link 
            href="/" 
            className="block py-2 px-4 text-gray-800 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/predict" 
            className="block py-2 px-4 text-gray-800 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Predict
          </Link>
          <Link 
            href="/dashboard" 
            className="block py-2 px-4 text-gray-800 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/reports" 
            className="block py-2 px-4 text-gray-800 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reports
          </Link>
        </div>
      )}
    </nav>
  );
};

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Welcome to HeartCare
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your partner in heart health monitoring and management through innovative technology and personalized insights.
          </p>
        </div>
      </section>
      
      {/* About Section */}
      <section className="max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            About HeartCare
          </h2>
          <div className="h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[ 
            { 
              src: '/img/9817.jpg', 
              title: 'Smart Monitoring',
              text: 'HeartCare helps you monitor and manage your heart health with smart technology, providing personalized risk predictions.' 
            },
            { 
              src: '/img/20944835.jpg', 
              title: 'Accessible Health',
              text: 'Our goal is to make heart health management accessible and simple, giving reliable insights and recommendations.' 
            },
            { 
              src: '/img/na_feb_47.jpg', 
              title: 'Proactive Care',
              text: 'Join us in making heart care proactive, accessible, and effective for everyone with HeartCare.' 
            }
          ].map((card, index) => (
            <div 
              key={index} 
              className="border border-gray-200 p-6 rounded-xl shadow-lg flex flex-col items-center bg-white hover:shadow-xl hover:border-red-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                <Image 
                  src={card.src} 
                  alt={card.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-700 text-center leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-red-100 text-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed md:text-lg">
              We envision a world where technology bridges the gap between patients and healthcare providers, empowering individuals with data-driven insights to take control of their heart health before problems arise.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-red-100 text-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed md:text-lg">
              Leveraging machine learning and predictive analytics, we strive to reduce the global burden of heart disease by providing user-friendly, science-backed tools that make heart health monitoring accessible to everyone.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">What People Are Saying</h3>
            <div className="h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                name: "Al Hanis",
                role: "Patient",
                quote: "HeartCare has revolutionized the way I manage my heart health. The insights have been incredibly helpful, and I feel more in control of my health than ever before."
              },
              {
                name: "Luqman",
                role: "Healthcare Professional",
                quote: "As a healthcare provider, I've recommended HeartCare to many of my patients. The data-driven approach helps them stay engaged with their heart health between appointments."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 md:p-8 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 text-red-500 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-gray-900 font-semibold">{testimonial.name}</span>
                    <span className="text-gray-500 text-sm">{testimonial.role}</span>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-16 md:py-20 text-center text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Start Your Heart Health Journey?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step toward better heart health today with HeartCare. Our personalized approach helps you understand and improve your cardiac wellness.
          </p>
          <Link 
            href="/predict" 
            className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <HiHeart className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-serif font-bold">HeartCare</h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering you to take control of your heart health through technology, data, and personalized insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/predict" className="text-gray-400 hover:text-white transition-colors duration-300">Predict</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300">Dashboard</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@heartcare.com
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} HeartCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
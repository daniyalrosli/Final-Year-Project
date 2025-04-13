'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with heart icon using SVG directly */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-red-500 fill-current">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h1 className="text-2xl font-serif text-black">HeartCare</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:block">
          <Link href="/" className="mx-4 text-black hover:text-red-500 transition font-medium">Home</Link>
          <Link href="/predict" className="mx-4 text-black hover:text-red-500 transition font-medium">Predict</Link>
          <Link href="/dashboard" className="mx-4 text-black hover:text-red-500 transition font-medium">Dashboard</Link>
          <Link href="/reports" className="mx-4 text-black hover:text-red-500 transition font-medium">Reports</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="p-2 text-gray-700 rounded-md outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const ContactsPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Contact Us</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
            Feel free to reach out to us for any inquiries or assistance. We&#39;re here to help with your heart health journey.
          </p>

          {/* Contact Information */}
          <div className="mb-8 space-y-4 bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">
                Email: <a href="mailto:support@heartcare.com" className="text-red-500 hover:underline">support@heartcare.com</a>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">
                Phone: <a href="tel:+123456789" className="text-red-500 hover:underline">+1 (234) 567-89</a>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">Address: 123 Heart Lane, Health City, HC 12345</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                id="subject"
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                placeholder="Please describe your inquiry in detail..."
                rows={4}
              ></textarea>
            </div>
            <div className="flex items-center">
              <input id="terms" type="checkbox" className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-red-500 hover:underline">privacy policy</a>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
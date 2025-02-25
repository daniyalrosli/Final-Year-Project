'use client';

import React from 'react';
import { HeartPulse, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with HeartPulse Icon */}
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-7 h-7 text-red-500" />
          <h1 className="text-2xl font-serif text-black">HeartCare</h1>
        </div>

        {/* Navigation Links */}
       <div>
          <Link href="/" className="mx-4 text-black hover:text-red-500 transition">Home</Link>
          <Link href="/predict" className="mx-4 text-black hover:text-red-500 transition">Predict</Link>
          <Link href="/dashboard" className="mx-4 text-black hover:text-red-500 transition">Dashboard</Link>
          <Link href="/reports" className="mx-4 text-black hover:text-red-500 transition">Reports</Link>
        </div>
      </div>
    </nav>
  );
};



const ContactsPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center text-black mb-4">Contact Us</h1>
          <p className="text-center text-gray-600 mb-6">
            Feel free to reach out to us for any inquiries or assistance.
          </p>

          {/* Contact Information */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-red-500 w-5 h-5" />
              <p className="text-black">
                Email: <a href="mailto:support@heartcare.com" className="text-red-500 hover:underline">support@heartcare.com</a>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-red-500 w-5 h-5" />
              <p className="text-black">
                Phone: <a href="tel:+123456789" className="text-red-500 hover:underline">+1 (234) 567-89</a>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-red-500 w-5 h-5" />
              <p className="text-black">Address: 123 Heart Lane, Health City, HC 12345</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black">Message</label>
              <textarea
                id="message"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Message"
                rows={4}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105"
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
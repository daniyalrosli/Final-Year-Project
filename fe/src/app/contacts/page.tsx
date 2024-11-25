// src/app/contact/page.tsx

'use client';

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-black">HeartCare</h1>
        <div>
          <a href="/predict" className="mx-4 text-black hover:text-red-500">Predict</a>
          <a href="/dashboard" className="mx-4 text-black hover:text-red-500">Dashboard</a>
          <a href="/analytics" className="mx-4 text-black hover:text-red-500">Analytics</a>
          <a href="/reports" className="mx-4 text-black hover:text-red-500">Reports</a>
          <a href="/logout" className="mx-4 text-black hover:text-red-500">Logout</a>
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
      <div className="bg-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Contact Us</h1>

        {/* Contact Information */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-black">Get in Touch</h2>
          <p className="mt-2">Email: <a href="mailto:support@heartcare.com" className="text-red-500">support@heartcare.com</a></p>
          <p>Phone: <a href="tel:+123456789" className="text-red-500">+1 (234) 567-89</a></p>
          <p className="text-black">Address: 123 Heart Lane, Health City, HC 12345</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
            <input
              id="name"
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-black">Message</label>
            <textarea
              id="message"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Message"
              rows={4}
            ></textarea>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Map Section (Optional) */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-black">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9">
            {/* Replace with an actual map embed code or a component */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.107284310394!2d-122.4194153846761!3d37.77492927975911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809b4f0fbd59%3A0xc3f2c5f5c79ebea4!2s123%20Heart%20Lane%2C%20San%20Francisco%2C%20CA%2094104%2C%20USA!5e0!3m2!1sen!2s!4v1643040843075!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-black">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
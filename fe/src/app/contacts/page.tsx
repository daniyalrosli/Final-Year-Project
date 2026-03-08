'use client';

import Navbar from '../components/navbar';
import { Layout, Container, Section, Card, Grid } from "@/components/ui/layout";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ContactsPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <Layout>
      <Navbar currentPage="/contacts" />
      <Section className="bg-gray-50">
        <Container size="lg" className="py-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-4">
              <HeartIconSolid className="w-4 h-4" />
              We&apos;re here to help
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-3">
              Contact HeartCare Support
            </h1>
            <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
              Have a question about your dashboard, predictions, or account? Send us a message and our team will respond as soon as possible.
            </p>
          </div>

          <Grid cols={2} gap="xl">
            {/* Contact Information */}
            <Card padding="lg" shadow="lg" className="col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-300">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href="mailto:support@heartcare.com" className="text-red-500 hover:text-red-600 transition-colors duration-200">
                      support@heartcare.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-300">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <a href="tel:+123456789" className="text-red-500 hover:text-red-600 transition-colors duration-200">
                      +1 (234) 567-89
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all duration-300">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">123 Heart Lane, Health City, HC 12345</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card padding="lg" shadow="lg" className="col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-sm text-gray-600 mb-6">
                Fill in the form below and we&apos;ll get back to you within one business day.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="Please describe your inquiry in detail..."
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input id="terms" type="checkbox" className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-red-500 hover:text-red-600 transition-colors duration-200">privacy policy</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </Card>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};

export default ContactsPage;
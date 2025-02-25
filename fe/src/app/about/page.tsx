'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartPulse } from 'lucide-react';

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

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-24 px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 relative inline-block after:block after:h-1 after:w-16 after:bg-red-500 after:mx-auto after:mt-2">
            About HeartCare
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ 
            { src: '/img/9817.jpg', text: 'HeartCare helps you monitor and manage your heart health with smart technology, providing personalized risk predictions.' },
            { src: '/img/20944835.jpg', text: 'Our goal is to make heart health management accessible and simple, giving reliable insights and recommendations.' },
            { src: '/img/na_feb_47.jpg', text: 'Join us in making heart care proactive, accessible, and effective for everyone with HeartCare.' }
          ].map((card, index) => (
            <div key={index} className="border border-gray-200 p-6 rounded-xl shadow-lg flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
              <Image src={card.src} alt="Card Image" width={200} height={200} className="mb-6 rounded-md" />
              <p className="text-gray-700 text-center">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif text-gray-900">Our Vision</h3>
          <p className="mt-4 text-gray-700">We envision a world where technology bridges the gap between patients and healthcare providers, empowering individuals with data-driven insights.</p>
          <h3 className="text-3xl font-serif text-gray-900 mt-16">Our Mission</h3>
          <p className="mt-4 text-gray-700">Leveraging machine learning and predictive analytics, we strive to reduce the global burden of heart disease with user-friendly, science-backed tools.</p>
        </div>
      </section>
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-serif text-gray-900 mb-12">What People Are Saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["Al Hanis", "Luqman"].map((name, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
                <p className="text-gray-600 italic">&quot;HeartCare has revolutionized the way I manage my heart health. The insights have been incredibly helpful!&quot;</p>
                <span className="block mt-4 text-gray-900 font-medium">- {name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-red-100 py-16 text-center">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif text-gray-900 mb-4">Ready to Start?</h3>
          <p className="text-gray-700 mb-8">Take the first step toward better heart health today with HeartCare. Sign up now!</p>
          <Link href="/predict" className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all transform hover:scale-105">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

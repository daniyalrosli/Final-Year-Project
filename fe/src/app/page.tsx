'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-gray-800">HeartCare</Link>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-500">About</Link>
          <Link href="/predict" className="text-gray-700 hover:text-red-500">Predict</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-red-500">Dashboard</Link>
          <Link href="/report" className="text-gray-700 hover:text-red-500">Report</Link>
          <Link href="/contacts" className="text-gray-700 hover:text-red-500">Contacts</Link>
          <Link href="/login" className="px-6 py-2 bg-white text-gray-700 rounded shadow-md hover:shadow-lg transition-shadow">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/img/OrgCoral_Med-04_Concept-01.jpg" // Replace with your heart illustration image
              alt="HeartCare Illustration"
              width={600}
              height={600}
              className="w-full"
              priority
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-serif text-gray-900">Welcome to HeartCare</h1>
            <h2 className="text-xl text-gray-700">Your Trusted Partner in Heart Health</h2>
            <p className="text-gray-600 leading-relaxed">
              HeartCare is a cutting-edge, web-based platform designed to empower you 
              in managing and understanding your heart health. Whether you&apos;re at home, 
              at work, or on the go, our user-friendly application offers personalized 
              insights to help you make informed decisions about your well-being.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif text-gray-900">Why Choose HeartCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-4">
              <Image
                src="/img/hehehhehehe.jpeg" // Replace with your images
                alt="Personalized Insights"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h3 className="text-xl font-medium text-gray-800">Personalized Insights</h3>
              <p className="text-gray-600">
                Tailored analytics to help you monitor your heart health and detect potential risks early.
              </p>
            </div>
            <div className="space-y-4">
              <Image
                src="/img/hehehe.jpeg"
                alt="Real-Time Monitoring"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h3 className="text-xl font-medium text-gray-800">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Access real-time data and visualize your progress with our interactive dashboards.
              </p>
            </div>
            <div className="space-y-4">
              <Image
                src="/img/hehehhe.jpeg"
                alt="Expert Guidance"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h3 className="text-xl font-medium text-gray-800">Expert Guidance</h3>
              <p className="text-gray-600">
                Built with input from healthcare professionals to ensure accurate and reliable insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-red-100 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-serif text-gray-900">Take Control of Your Heart Health</h2>
            <p className="text-gray-600 mt-4">
              With HeartCare, you can stay proactive in preventing heart disease and maintaining a healthy lifestyle. 
              Join our community of users committed to better heart health today!
            </p>
            <Link href="/signup" className="inline-block mt-6 px-6 py-3 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-gray-800">
          HeartCare
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500">
            Home
          </Link>
          <Link href="/patient" className="text-gray-700 hover:text-red-500">
            Patient
          </Link>
          <Link href="/predict" className="text-gray-700 hover:text-red-500">
            Predict
          </Link>
          <Link href="/report" className="text-gray-700 hover:text-red-500">
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* About Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 relative inline-block">
            About HeartCare
          </h2>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/img/9817.jpg"
              alt="Heart Monitoring"
              width={200}
              height={200}
              className="mb-6"
            />
            <p className="text-gray-700 text-center">
              HeartCare is an online platform that helps you easily monitor and manage your heart health. Using smart technology, we give you personalized predictions about your heart disease risk based on your health information.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/img/20944835.jpg"
              alt="Heart Management"
              width={200}
              height={200}
              className="mb-6"
            />
            <p className="text-gray-700 text-center">
              Our goal is to make heart health management simple and accessible for everyone. We provide reliable insights and recommendations to help you take control of your well-being. Whether you&apos;re preventing heart issues or staying informed, HeartCare is easy to use.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/img/na_feb_47.jpg"
              alt="Our Mission"
              width={200}
              height={200}
              className="mb-6"
            />
            <p className="text-gray-700 text-center">
              Join us on our mission to enhance heart health and promote a healthier life with HeartCare. By using our platform, you&apos;re not just monitoring your heart—you&apos;re taking proactive steps toward a healthier future. Together, we can make heart care simpler, more accessible, and more effective for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-serif text-gray-900">Our Vision</h3>
          <p className="mt-4 text-gray-700">
            At HeartCare, we envision a world where advanced technology bridges the gap between patients and healthcare providers. 
            Our platform aims to empower individuals to make informed decisions about their heart health through data-driven insights.
          </p>

          <h3 className="text-3xl font-serif text-gray-900 mt-16">Our Mission</h3>
          <p className="mt-4 text-gray-700">
            Our mission is to leverage machine learning and predictive analytics to reduce the global burden of heart disease. 
            We are committed to providing tools that are not only user-friendly but also backed by robust, science-based methodologies.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-serif text-gray-900 mb-12">What People Are Saying</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <p className="text-gray-600 italic">
                "HeartCare has revolutionized the way I manage my heart health. 
                The platform is so easy to use, and the insights have been incredibly helpful. 
                I feel more in control of my health than ever before!"
              </p>
              <span className="block mt-4 text-gray-900 font-medium">- Al Hanis</span>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <p className="text-gray-600 italic">
                "The predictions from HeartCare are remarkably accurate. 
                It’s like having a personal heart health advisor with me at all times."
              </p>
              <span className="block mt-4 text-gray-900 font-medium">- Luqman</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-100 py-16 text-center">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif text-gray-900 mb-4">Ready to Start?</h3>
          <p className="text-gray-700 mb-8">
            Take the first step toward better heart health today with HeartCare. 
            Sign up now and explore how we can help you live a healthier, longer life.
          </p>
          <Link
            href="/signup"
            className="px-6 py-3 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
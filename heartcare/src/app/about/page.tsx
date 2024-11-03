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
          <Link href="/reports" className="text-gray-700 hover:text-red-500">
            Reports
          </Link>
          <Link href="/analytics" className="text-gray-700 hover:text-red-500">
            Analytics
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
    </div>
  );
}
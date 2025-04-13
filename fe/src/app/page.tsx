'use client';

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white py-5 px-8 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center space-x-3 text-3xl font-bold text-gray-800 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-playfair">HeartCare</span>
        </Link>

        {/* Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">Home</Link>
          <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">About</Link>
          <Link href="/predict" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">Predict</Link>
          <Link href="/dashboard" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">Dashboard</Link>
          <Link href="/report" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">Report</Link>
          <Link href="/contacts" className="text-lg font-medium text-gray-700 hover:text-red-500 transition-colors">Contacts</Link>
        </div>

        {/* Mobile menu button (visible on small screens) */}
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative transform transition-transform duration-500 hover:scale-105">
            <Image
              src="/img/OrgCoral_Med-04_Concept-01.jpg"
              alt="HeartCare Illustration"
              width={600}
              height={600}
              className="w-full rounded-lg shadow-xl"
              priority
            />
          </div>
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight font-playfair">Welcome to <span className="text-red-500">HeartCare</span></h1>
            <h2 className="text-2xl text-gray-700 font-light">Your Trusted Partner in Heart Health</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              HeartCare is a cutting-edge, web-based platform designed to empower you 
              in managing and understanding your heart health. Whether you&apos;re at home, 
              at work, or on the go, our user-friendly application offers personalized 
              insights to help you make informed decisions about your well-being.
            </p>
            <div className="pt-4">
              <Link href="/predict" className="inline-block px-8 py-4 bg-red-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-600 transition-all transform hover:-translate-y-1">
                Try Heart Prediction
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 font-playfair mb-4">Why Choose HeartCare?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">Our platform combines cutting-edge technology with medical expertise to provide you with the best heart health management experience.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="bg-red-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Insights</h3>
              <p className="text-gray-600">
                Tailored analytics to help you monitor your heart health and detect potential risks early.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="bg-red-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Access real-time data and visualize your progress with our interactive dashboards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="bg-red-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Built with input from healthcare professionals to ensure accurate and reliable insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-12 rounded-2xl shadow-2xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-playfair">Take Control of Your Heart Health Today</h2>
            <p className="text-xl mt-4 max-w-3xl mx-auto opacity-90">
              With HeartCare, you can stay proactive in preventing heart disease and maintaining a healthy lifestyle. 
              Join our community of users committed to better heart health!
            </p>
            <Link href="/predict" className="inline-block mt-8 px-8 py-4 bg-white text-red-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-playfair">HeartCare</h3>
              <p className="text-gray-300">Your trusted partner for heart health monitoring and predictions.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/predict" className="text-gray-300 hover:text-white transition-colors">Predict</Link></li>
                <li><Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/research" className="text-gray-300 hover:text-white transition-colors">Research</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HeartCare. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Font imports - add these to your head in your layout.js file */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-serif: 'Playfair Display', Georgia, Cambria, serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: var(--font-sans);
          line-height: 1.6;
        }
        
        .font-playfair {
          font-family: var(--font-serif);
        }
      `}</style>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiHeart, HiOutlineMenu, HiX } from 'react-icons/hi';

interface NavbarProps {
  currentPage?: string;
}

const Navbar = ({ currentPage = '' }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/predict', label: 'Predict' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/report', label: 'Reports' },
    { href: '/contacts', label: 'Contact' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-8 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with HeartPulse Icon */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-gray-800 hover:text-red-500 transition-colors duration-300">
          <HiHeart className="w-8 h-8 text-red-500" />
          <span>HeartCare</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors duration-300 ${
                currentPage === item.href
                  ? 'text-red-500'
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
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
        <div className="md:hidden pt-4 pb-2 px-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`block py-2 px-4 rounded-md transition-colors duration-300 ${
                currentPage === item.href
                  ? 'bg-red-50 text-red-500'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-500'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
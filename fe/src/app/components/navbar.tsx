import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Now this should work

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Access the auth context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-red-500">HeartCare</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">Home</span>
              </Link>
              <Link href="/about">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">About</span>
              </Link>
              <Link href="/predict">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">Predict</span>
              </Link>
              <Link href="/dashboard">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">Dashboard</span>
              </Link>
              <Link href="/report">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">Report</span>
              </Link>
              <Link href="/contacts">
                <span className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">Contacts</span>
              </Link>
              {!isAuthenticated ? (
                <Link href="/login">
                  <span className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-md font-medium">Login</span>
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-md font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-red-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-label="Toggle navigation"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</span>
            </Link>
            <Link href="/predict">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Predict</span>
            </Link>
            <Link href="/dashboard">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</span>
            </Link>
            <Link href="/report">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Report</span>
            </Link>
            <Link href="/contacts">
              <span className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contacts</span>
            </Link>
            {!isAuthenticated ? (
              <Link href="/login">
                <span className="text-white bg-red-500 hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium">Login</span>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-white bg-red-500 hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
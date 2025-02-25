'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        {!isAuthenticated && (
          <div>
            <a href="/login" className="text-red-500 hover:underline mx-2">Login</a>
            <a href="/signup" className="text-red-500 hover:underline">Sign Up</a>
          </div>
        )}
      </div>
    </nav>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in both fields.');
      toast.error('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in local storage
        setIsAuthenticated(true);
        toast.success('Login successful!');
        router.push('/'); // Redirect to homepage
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid username or password.');
        toast.error('Login failed.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      toast.error('Network error.');
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="bg-white min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-center">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-red-500 hover:underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

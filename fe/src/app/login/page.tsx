// src/app/login/page.tsx

'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Make sure to import from next/navigation

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
      </div>
    </nav>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log('Logged in:', { email, password });
      router.push('/dashboard'); // Redirect to dashboard after login
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
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
    </>
  );
};

export default Login;
// src/app/signup/page.tsx

'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Importing from next/navigation

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
      </div>
    </nav>
  );
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      // Here you can add logic for signing up the user
      console.log('User signed up:', { name, email, password });
      router.push('/login'); // Redirect to login after signup
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Sign Up</Button>
            <p className="text-center">
              Already have an account?{' '}
              <a href="/login" className="text-red-500 hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
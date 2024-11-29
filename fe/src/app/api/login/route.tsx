// src/app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Example user data for simulation (replace with real database query)
  const users = [
    { username: 'admin', password: 'admin123' }, // This is just a placeholder, use hashed passwords in real apps
  ];

  // Check if username and password are valid
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    // If user not found or password is incorrect
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  // If credentials are valid
  return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
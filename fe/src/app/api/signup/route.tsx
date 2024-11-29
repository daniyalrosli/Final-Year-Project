// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Example validation (Replace with actual DB check)
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Simulate user creation (replace with real database logic)
  // Simulate user creation (replace with real database logic)
  // Make sure to hash the password before storing it

  // Simulate successful signup
  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
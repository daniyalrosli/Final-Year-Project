import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Example user data for simulation (replace with real database query)
  const users = [
    { username: 'admin', password: 'admin123' }, // Placeholder, use hashed passwords in real apps
  ];

  // Check if username and password are valid
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  // Create a session token (You should use JWT in a real application)
  const sessionToken = Buffer.from(`${username}:${password}`).toString('base64');

  // Store the token in cookies
  const cookieStore = await cookies();
  cookieStore.set('sessionToken', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
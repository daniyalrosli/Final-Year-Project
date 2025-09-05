import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Predict API is working',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Predict API called');
    
    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate the request body
    if (!body || typeof body !== 'object') {
      console.error('Invalid request body:', body);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate that all required fields are present and are numbers
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    const missingFields = requiredFields.filter(field => !(field in body));
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate that all values are numbers
    const invalidFields = requiredFields.filter(field => typeof body[field] !== 'number' || isNaN(body[field]));
    
    if (invalidFields.length > 0) {
      console.error('Invalid field types:', invalidFields);
      return NextResponse.json(
        { error: `Invalid field types (must be numbers): ${invalidFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Define the backend API URL
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
    console.log('Backend URL:', backendUrl);
    
    // Forward the request to the backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const response = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Backend response status:', response.status);
      console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

      // Check if the backend response is successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        
        return NextResponse.json(
          { 
            error: `Backend API error: ${response.status} ${response.statusText}`,
            details: errorText
          },
          { status: response.status }
        );
      }

      // Parse the backend response
      const data = await response.json();
      console.log('Backend response data:', data);
      
      // Return the response from the backend
      return NextResponse.json(data);
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('Request timeout');
        return NextResponse.json(
          { error: 'Request timeout. The backend server is taking too long to respond.' },
          { status: 408 }
        );
      }
      
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { 
          error: 'Unable to connect to the backend server. Please ensure the backend is running on http://localhost:8000',
          details: fetchError instanceof Error ? fetchError.message : 'Unknown fetch error'
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Predict API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

#!/bin/bash

echo "🚀 Starting HeartCare Development Environment..."
echo "================================================"

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Check if backend port is available
if check_port 8000; then
    echo "❌ Port 8000 is already in use. Please stop any existing backend server."
    exit 1
fi

# Check if frontend port is available
if check_port 3000; then
    echo "❌ Port 3000 is already in use. Please stop any existing frontend server."
    exit 1
fi

echo "✅ Ports are available"

# Start backend server
echo "🔧 Starting Backend Server (Flask) on http://localhost:8000..."
cd "$(dirname "$0")"
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if check_port 8000; then
    echo "✅ Backend server started successfully"
else
    echo "❌ Backend server failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend server
echo "🎨 Starting Frontend Server (Next.js) on http://localhost:3000..."
cd fe
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Check if frontend started successfully
if check_port 3000; then
    echo "✅ Frontend server started successfully"
else
    echo "❌ Frontend server failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 HeartCare is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8000"
echo "🏥 Health Check: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait

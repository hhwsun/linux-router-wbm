#!/bin/bash

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "========================================"
echo "Starting in MOCK MODE (Safe Testing)"
echo "========================================"
echo ""
echo "⚠️  No real system commands will execute"
echo "✅ All data is simulated"
echo "✅ 100% safe for development"
echo ""

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

echo "Starting backend in mock mode..."
cd "$SCRIPT_DIR/backend" && MOCK_MODE=true npm start &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend dev server..."
cd "$SCRIPT_DIR/frontend" && npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Services started in MOCK MODE!"
echo "========================================"
echo "Backend API: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo ""
echo "All network interfaces, routes, and"
echo "firewall data is FAKE and SAFE!"
echo ""
echo "Press Ctrl+C to stop"
echo "========================================"

wait

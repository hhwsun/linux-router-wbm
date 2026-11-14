#!/bin/bash

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Starting Linux Router Management Interface..."
echo "=============================================="
echo ""

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

echo "Starting backend API server..."
cd "$SCRIPT_DIR/backend" && npm start &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend dev server..."
cd "$SCRIPT_DIR/frontend" && npm start &
FRONTEND_PID=$!

echo ""
echo "=============================================="
echo "Services started!"
echo "Backend API: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=============================================="

wait

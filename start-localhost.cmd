@echo off
setlocal

cd /d "%~dp0"
title Sip Studies Localhost

if not exist node_modules (
  echo node_modules not found. Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency install failed.
    pause
    exit /b 1
  )
)

echo Starting local dev server...
echo URL: http://127.0.0.1:5173/
echo Press Ctrl+C to stop.
echo.

start "" "http://127.0.0.1:5173/"
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort

echo.
echo Dev server stopped. Press any key to close.
pause >nul

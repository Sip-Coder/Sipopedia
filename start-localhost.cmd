@echo off
setlocal

cd /d "%~dp0"
title Sip Studies Localhost

echo Starting local dev server...
echo URL: http://127.0.0.1:5173/
echo Press Ctrl+C to stop.
echo.

npm run dev -- --host 127.0.0.1 --port 5173 --strictPort

echo.
echo Dev server stopped. Press any key to close.
pause >nul

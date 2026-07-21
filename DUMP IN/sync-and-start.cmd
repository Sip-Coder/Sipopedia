@echo off
setlocal

REM Resolve repo root as parent of this script's folder ("DUMP IN")
set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "REPO_DIR=%%~fI"

echo.
echo [1/5] Switching to repo: %REPO_DIR%
cd /d "%REPO_DIR%" || (
  echo ERROR: Could not open repo directory.
  exit /b 1
)

echo.
echo [2/5] Fetching latest from GitHub...
git fetch origin
if errorlevel 1 goto :sync_error

echo.
echo [3/5] Checking out main...
git checkout main
if errorlevel 1 goto :sync_error

echo.
echo [4/5] Fast-forward pull from origin/main...
git pull --ff-only origin main
if errorlevel 1 goto :pull_error

echo.
echo [5/5] Installing dependencies...
npm install
if errorlevel 1 (
  echo.
  echo ERROR: npm install failed.
  exit /b 1
)

echo.
echo Starting dev server...
echo Press Ctrl+C to stop.
npm run dev
exit /b %errorlevel%

:sync_error
echo.
echo ERROR: Git sync failed.
echo Check your internet/login and run manually:
echo   git fetch origin
echo   git checkout main
exit /b 1

:pull_error
echo.
echo ERROR: Fast-forward pull failed (likely local changes or branch divergence).
echo Use ONE of these options:
echo   SAFE (keep local changes): resolve and commit first.
echo   HARD RESET (discard local changes):
echo     git fetch origin
echo     git reset --hard origin/main
echo     git clean -fd
exit /b 1

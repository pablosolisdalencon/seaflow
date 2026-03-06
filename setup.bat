@echo off
echo Setting up SGI Seaflow - Sprint 1...

echo [1/4] Installing Backend dependencies...
cd back
call npm install
echo [2/4] Setting up Database...
call node src/scripts/setup_db.js
call node src/database/seed.js
echo [3/4] Installing Frontend dependencies...
cd ../front
call npm install
echo [4/4] Setup complete!
echo.
echo Para iniciar el sistema completo:
echo    npm run dev
echo.
echo Para iniciar individualmente:
echo    Terminal 1: npm run back
echo    Terminal 2: npm run front
timeout /t 10

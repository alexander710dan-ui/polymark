@echo off
title Polymark fast loop
cd /d "%~dp0"
echo Polymark fast paper-trading loop - tick every 2 minutes.
echo Close this window to stop. GitHub Actions keeps running as backup.
node tester\index.js loop 120
pause

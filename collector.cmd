@echo off
title Polymark whale collector
cd /d "%~dp0"
echo Polymark whale collector - live firehose, logs whale trades + latency snapshots.
echo Close this window to stop.
node collector\index.js run
pause

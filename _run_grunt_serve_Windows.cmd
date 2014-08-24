REM Runs grunt server with browserSync and watch tasks
@echo off
IF not exist node_modules (npm install)
grunt serve
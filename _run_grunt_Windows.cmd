REM Runs the default grunt command from the current directory
@echo off
IF not exist node_modules (npm install)
grunt

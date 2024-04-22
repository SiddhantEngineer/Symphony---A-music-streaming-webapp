@echo off
cd /d "backend"
start npm start
cd /d "../frontend"
start npm run dev

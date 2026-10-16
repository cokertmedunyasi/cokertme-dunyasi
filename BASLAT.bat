@echo off
chcp 65001 >nul
title ÇÖKERTME DÜNYASI - Web, QR Menü ve Mobil Uygulama Sunucusu
echo Çökertme Dünyası Dijital Sistemi başlatılıyor...
start "" "http://localhost:3000/index.html"
node server.js
pause

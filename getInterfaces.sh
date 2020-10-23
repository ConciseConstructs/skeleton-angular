#1/bin/bash

echo "Cloning interfaces from GitHub..."
cd src/assets/interfaces
rmdir auth-server-service-interfaces
git clone https://github.com/ConciseConstructs/auth-server-service-interface
rmdir database-server-service-interface
git clone https://github.com/ConciseConstructs/database-server-service-interface
rmdir email-server-service-interface
git clone https://github.com/ConciseConstructs/email-server-service-interface
rmdir login-server-service-interface
git clone https://github.com/ConciseConstructs/login-server-service-interface
rmdir contact-server-service-interface
git clone https://github.com/ConciseConstructs/contact-server-service-interface
rmdir ICRUD
git clone https://github.com/ConciseConstructs/ICRUD

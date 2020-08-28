#!/bin/bash 


echo "Syncing Interfaces from GitHub..."
cd src/assets/interfaces
git clone https://github.com/ConciseConstructs/auth-server-service-interface.git
git clone https://github.com/ConciseConstructs/database-server-service-interface.git
git clone https://github.com/ConciseConstructs/email-server-service-interface.git
git clone https://github.com/ConciseConstructs/login-server-service-interface.git
git clone https://github.com/ConciseConstructs/contact-server-service-interface
git clone https://github.com/ConciseConstructs/icrud.git

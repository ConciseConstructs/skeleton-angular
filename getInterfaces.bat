cd src/assets/interfaces

rd /s /q auth-server-service-interface
if exist auth-server-service-interface rd /s /q auth-server-service-interface
git clone https://github.com/ConciseConstructs/auth-server-service-interface.git

rd /s /q database-server-service-interface
if exist database-server-service-interface rd /s /q database-server-service-interface
git clone https://github.com/ConciseConstructs/database-server-service-interface.git

rd /s /q email-server-service-interface
if exist email-server-service-interface rd /s /q email-server-service-interface
git clone https://github.com/ConciseConstructs/email-server-service-interface.git

rd /s /q login-server-service-interface
if exist login-server-service-interface rd /s /q login-server-service-interface
git clone https://github.com/ConciseConstructs/login-server-service-interface.git

rd /s /q icrud
if exist icrud rd /s /q icrud
git clone https://github.com/ConciseConstructs/icrud.git

cd ..
cd ..
cd ..

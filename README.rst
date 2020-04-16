=========================
To install all modules

npm install

=========================

To start the server run below command
   NODE_ENV=local npm start
==========================
Post used in code : 5000

========================= Postman for uploadFile =====================

curl --location --request POST 'http://localhost:5000/api/v1/upload-file' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--form 'files=@/home/ibis-lt-074/Desktop/employee_data_v1.csv'
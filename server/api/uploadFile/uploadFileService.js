'use strict';

/**
 * This file is used to control all database operation  .
 * @name uploadFileService.js
 */


const request = require('request');
const constant = require('../../util/constant');
const parse = require('csv-parse/lib/sync')
//const producer = require('../../util/kafka')
const kafka = require('kafka-node')

module.exports = class UploadFileService {
    /**
     * @description Process the file
     * @param {String} files
     * @param {Object} reqBody
     * @param {Pomise} callback
     */
    processUserFile(files, reqBody) {
        return new Promise((resolve,reject) => {
            try {
                const employeeData = parse(files.files.data, {
                    columns: true,
                    delimiter: ',',
                    skip_empty_lines: true
                  })
                var Producer = kafka.Producer
                // instantiate client with as connectstring host:port for  the ZooKeeper for the Kafka cluster
                const client = new kafka.KafkaClient();
                var producer = new Producer(client)
                // read the inputFile, feed the contents to the parser
                producer.on('ready', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        UploadFileService.handleFileData(employeeData,0)
                        resolve(employeeData);
                    }
                });
                producer.on('error', function (err) {
                    reject(err);
                })
            } catch (error) {
                logger.error("Error in upload", error);
                reject(error);
            }
        });
    }
    // handle the current coountry record
    static handleFileData(employeeArray, currentEmp) {
        if(employeeArray[currentEmp] !== undefined) {
            var line = employeeArray[currentEmp];
            var emp_data = { "name" : line["name"]
                        , "phone" : line["phone"]
                        , "email" : line["email"]
                        , "company" : line["company"]
                        };
            console.log(JSON.stringify(emp_data));
            // produce country message to Kafka
            UploadFileService.produceEmployeeData(emp_data)
            var averageDelay = 3000;  // in miliseconds
            var spreadInDelay = 2000; // in miliseconds
            var delay = averageDelay + (Math.random() -0.5) * spreadInDelay;
            //NOTE: use bind to pass in the value for the input parameter currentEmp
            setTimeout(UploadFileService.handleFileData.bind(null,employeeArray, currentEmp+1), delay);
        }
    }

    static produceEmployeeData(emp_data){
        const employeeTopic = constant.KAFKA_TOPIC_FOR_EMPLOYEE_DATA;
        var KeyedMessage = kafka.KeyedMessage,
        Producer = kafka.Producer
        // instantiate client with as connectstring host:port for  the ZooKeeper for the Kafka cluster
        const client = new kafka.KafkaClient();
        var producer = new Producer(client);
        var employeeKM = new KeyedMessage(emp_data.email, JSON.stringify(emp_data)),
        payloads = [
            { topic: employeeTopic, messages: employeeKM, partition: 0 },
        ];
        producer.send(payloads, function (err, data) {
            console.log("Here->",data);
        });
    }
};

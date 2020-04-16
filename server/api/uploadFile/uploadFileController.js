'use strict';

/**
 * This file is used to control all uploadFile api request response .
 * @name uploadFileController.js
 */


const uploadFileService = require('./uploadFileService');
const Utils = require('../../util/utilFunctions');
const UploadFileService = new uploadFileService();
const constant = require('../../util/constant');

module.exports = class UploadFileController {

      // Handle all pdf of user uploaded store in s3 and also in database
    uploadFileHandler(files, callback) {
        var file = files.files;
        // get file extension
        var fileType = file.name.split('.').pop();
        // get file size
        var fileSize = Buffer.byteLength(file.data, 'utf8');
        fileSize = (fileSize / 1048576).toFixed(2);
        // check file size and type valid or not
        if (fileType !== 'csv') {
            callback('Please Upload Valid file');
        } else if (parseInt(fileSize) > constant.UPLOAD_CSV_MAXSIZE) {
            callback(`File size must be less than ${constant.UPLOAD_CSV_MAXSIZE}mb`);
        } else {
            callback(null, true);
        }
     }

     /**
     * @description Upload File function
     * @param req
     * @param res
     */
    uploadFile(req, res) {
        if (!req.files) {
            res.status(400).send('No files');
        } else {
            var files = req.files;
            new UploadFileController().uploadFileHandler(files, (err, fileValid) => {
                if(fileValid){
                    UploadFileService.processUserFile(files, req.body).then(function (resolve) {
                        Utils.sendResponse(null, resolve, res, 'UPLOAD_FILE');
                    }, function (reject) {
                        Utils.sendResponse(reject, null, res, 'UPLOAD_FILE');
                    });
                } else {
                    Utils.sendResponse(err, null, res, 'UPLOAD_PDF');
                }
            });
        }
    }
};

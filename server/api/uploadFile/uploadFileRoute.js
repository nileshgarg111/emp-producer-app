'use strict';

/**
 * here register all article Module api route
 * @name uploadFileRoute.js
 */

const multer = require('multer');
const express = require('express');
const router = express.Router();
const uploadFileController = require('./uploadFileController');
const UploadFileController = new uploadFileController();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage })
router.post('/', upload.single('files'), UploadFileController.uploadFile);

module.exports = router;

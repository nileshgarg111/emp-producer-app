/**
 * This file is used as here register all api module
 * @name api.js
 */

const router = require('express').Router();

router.use('/upload-file', require('./uploadFile/uploadFileRoute'));
module.exports = router;

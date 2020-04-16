'use strict';

/**
 * This file is used as database model handle all requst data. .
 * @name uploadFileModel.js
 */

/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: Number, default: '' },
  company: { type: String, default: '' }
});

/**
 * Methods
 */

UserSchema.method({});

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

module.exports = mongoose.model('Employee', UserSchema);

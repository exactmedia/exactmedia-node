/*
 * lib/security.js
 */

'use strict';

var assert = require('assert'),
    crypto = require('crypto');

var _ = require('lodash');

var ENCRYPT_ALGO = 'aes-256-cbc';

function decrypt(encryptedData, key) {
  assert(!_.isUndefined(encryptedData),
    '"encryptedData" must have a value.');
  assert(_.isString(key) && key.length === 32,
    '"key" must be a string with 32 hexadecimal digits.');

  var hexedIv = encryptedData.substring(0, 32),
      hexedCipherText = encryptedData.substring(32, encryptedData.length),
      iv = new Buffer(hexedIv, 'hex'),
      cipherText = new Buffer(hexedCipherText, 'hex'),
      decipher = crypto.createDecipheriv(ENCRYPT_ALGO, key, iv);

  return JSON.parse(decipher.update(cipherText) + decipher.final());
}

function encrypt(data, key) {
  assert(!_.isUndefined(data),
    '"data" must have a value.');
  assert(_.isString(key) && key.length === 32,
    '"key" must be a string with 32 hexadecimal digits.');

  var iv = crypto.randomBytes(16),
      cipher = crypto.createCipheriv(ENCRYPT_ALGO, key, iv),
      encryptedData;

  encryptedData = iv.toString('hex') +
    cipher.update(JSON.stringify(data), 'utf8', 'hex') +
    cipher.final('hex');

  return encryptedData;
}

// Public API
exports.decrypt = decrypt;
exports.encrypt = encrypt;

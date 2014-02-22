/*
 * examples/all.js
 */

'use strict';

var exactmedia = require('..');

var KEY = '12345678901234567890123456789012';

var encrypted;

encryptedData = exactmedia.security.encrypt('abc', KEY);
console.log(exactmedia.security.decrypt(encryptedData, KEY));

encryptedData = exactmedia.security.encrypt(12.34, KEY);
console.log(exactmedia.security.decrypt(encryptedData, KEY));

encryptedData = exactmedia.security.encrypt(new Date(), KEY);
console.log(exactmedia.security.decrypt(encryptedData, KEY));

encryptedData = exactmedia.security.encrypt([1,2,3], KEY);
console.log(exactmedia.security.decrypt(encryptedData, KEY));

encryptedData = exactmedia.security.encrypt({a:1,b:2}, KEY);
console.log(exactmedia.security.decrypt(encryptedData, KEY));

const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const imageProcessing = require('./image-processing.controller');
const config = require('../../config/config');

const router = express.Router(); 

/** POST /api/auth/image - Return the resized image. */
router.route('/image')
  .post(validate(paramValidation.imageProcess), imageProcessing.returnResizeImage);

module.exports = router;
const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const imageProcessing = require('./image-processing.controller');

const router = express.Router(); 

/** POST /api/auth/image - Return the resized image. */
router.route('/process')
  .post(validate(paramValidation.imageProcess), imageProcessing.returnResizeImage);

module.exports = router;
const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const jsonPatch = require('./json-patch.controller');

const router = express.Router(); 


router.route('/json')
  .patch(validate(paramValidation.patchJson), jsonPatch.patchExample);

module.exports = router;

/** 
 * @todo - find out good discription for this.
 */
const express = require('express');
const morgan = require('morgan');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidation = require('express-validation');


/** 
 * @todo - find out better dic.
 */
const app = express();

/**
 * @todo - find out good discription for this.
 */
const logger = require('./logger');
const routes = require('../index.route');
const APIError = require('../server/helpers/APIError');

/**
 * @description - parsing all the incomming messages in json format.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

/**
 * @description - mount all the API.
 */
app.use('/api', routes);

/**
 * @todo - capturing all the error.
 */
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
      } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
      }
      return next(err);
});

/**
 * @description - catch 404.
 */
app.use((req, res, next) => {
    const error = new APIError('API not found', httpStatus.NOT_FOUND);
    return next(error);
});

module.exports = app;
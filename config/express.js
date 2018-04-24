
/** 
 * @todo - find out good discription for this.
 */
const express = require('express');
const morgan = require('morgan');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const expressValidation = require('express-validation');
const expressWinston = require('express-winston');


/** 
 * @todo - find out better dic.
 */
const app = express();

/**
 * @todo - find out good discription for this.
 */
const config = require('./config');
const routes = require('../index.route');
const APIError = require('../server/helpers/APIError');
const winstonInstance = require('./winston');
/**
 * @description - parsing all the incomming messages in json format.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable detailed API logging in dev env
if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }));
  }
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
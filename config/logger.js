'use strict';
const winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

/* create a log directory if it does not exists **/
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/**
 * @description - add logger.
 * @example - logger.error || logger.warn || logger.info || logger.debugg.
 */
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: function() {
                return new Date().toISOString();
            }
        }),
        new (require('winston-daily-rotate-file'))({
            name: 'info',
            zippedArchive: true,
            filename: `${logDir}/%DATE%-info.log`,
            prepend: true,
            maxFiles: '10d',
            level:'info'
        }),
        new (require('winston-daily-rotate-file'))({
            name: 'error',
            zippedArchive: true,
            filename: `${logDir}/%DATE%-error.log`,
            prepend: true,
            maxFiles: '10d',
            level: 'error'
        }),
        new (require('winston-daily-rotate-file'))({
            name: 'warn',
            zippedArchive: true,
            filename: `${logDir}/%DATE%-warn.log`,
            prepend: true,
            maxFiles: '10d',
            level: 'warn'
        }),
        new (require('winston-daily-rotate-file'))({
            name: 'debug',
            zippedArchive: true,
            filename: `${logDir}/%DATE%-debug.log`,
            prepend: true,
            maxFiles: '10d',
            level: 'debug'
        })
    ]
}); 

module.exports = logger;
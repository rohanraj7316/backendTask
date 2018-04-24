'use strict';
const winston = require('winston');
const fs = require('fs');


const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// create a log directory if it does not exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}


module.exports = function(callingModule) {
  var getLabel = function() {
    var parts = callingModule.filename.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
  };
  return new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: 'debug',
            label: getLabel(),
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
}
const mongoose = require('mongoose');
const util  = require('util');

const config = require('./config/config');
const app = require('./config/express');
const logger = require('./config/logger')(module);

/**
 * @description - bluebird is added as mongoose file main promise.
 */
mongoose.Promise = require('bluebird');

/**
 * @description - connect to the MongoDB.
 */
// const mongoUri = config.mongo.host;
// mongoose.connect (mongoUri);

// /**
//  * @description - will be get triggered when there is any connection error.
//  */
// mongoose.connection.on('error', (error) => {
//     /**
//      * @description - this statement has been added to stop the server.
//      */
//     logger.error(`Error in MongoDB connection ${mongoUri}: ${error}`);
//     throw new Error (`unable to connect to MongoDB ${mongoUri}`);
// });

app.listen (config.port, () => {
    logger.info (`Server has been started on port ${config.port}`);
});

module.exports = app;
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const logger = require('./../../config/logger')(module);


    /**
     * @description - validate user
     * @param {Object} req - Request Object.
     * @param {Object} res - Response Object.
     * @param {Function} next - Callback Function.
     * @return {Object} - Token || UNAUTHORIZED
     */
function login(req, res, next) {

    /** matching user & pass. */
    if (req.body.uname === 'testuser@gmail.com' && req.body.pass === 'password') {
        const token = jwt.sign ({
            username: 'testuser@gmail.com'
        }, config.jwtSecret);

        return res.json({
            token, 
            uname: 'testuser@gmail.com'
        });
    }
    const error = new APIError(`Authentication error`, httpStatus.UNAUTHORIZED, true);
    logger.error(error);
    return next (error);
}

module.exports = {
    login
}
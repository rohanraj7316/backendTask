const httpStatus = require('http-status');
const APIError = require('./../helpers/APIError');
const rq = require('request');
const fs = require('fs');

/**
 * @description - resizing image.
 * @param {Object} req - Request Object.
 * @param {Object} res - Response Object.
 * @param {Function} next - Callback Function.
 * @return {Object} - Resize Image || Error.
 */
function returnResizeImage (req, res, next) {
    request(req.body.imageurl, (err, body, response) => {
        if (err) {
            return next (error);
        } else {
            if (body && response.statusCode === 200) {
                /** check for dir exists or not. */
                if (!fs.existsSync('images')) {
                    fs.mkdirSync('images');
                }
                
            } else {
                if (!body) {
                    /** image loading error. */
                    return next ();
                } else {
                    /** other type of error. */
                    return next ();
                }
            }
        }
    });
}

module.exports = {
    returnResizeImage
}
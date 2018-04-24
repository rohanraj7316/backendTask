const httpStatus = require('http-status');
const Jimp = require("jimp");
const path = require('path');

const APIError = require('./../helpers/APIError');
const logger = require('./../../config/logger')(module);

/**
 * @description - resizing image.
 * @param {Object} req - Request Object.
 * @param {Object} res - Response Object.
 * @param {Function} next - Callback Function.
 * @return {Object} - Resize Image || Error.
 */
function returnResizeImage (req, res, next) {
    Jimp.read(req.body.imageurl)
        .then(imageData => {
            let processImage = imageData
                                .resize(50, 50)
                                .quality(60)
                                .write("lena-small-bw.jpg");
            
            if (processImage) {
                return res.sendFile('/Users/rohanraj/Desktop/workspace/myproj/backendTask/lena-small-bw.jpg');
            } else {
                logger.error({
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Not able to process image'
                });
                return res.json({
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Not able to process image'
                });
            }
        }).catch(error => {
            logger.error(error);
            return next (error);
        });
}

module.exports = {
    returnResizeImage
}
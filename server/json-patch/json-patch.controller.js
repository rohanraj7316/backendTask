const httpStatus = require('http-status');
const jsonPatch = require('json-patch');
const APIError = require('../helpers/APIError');

var DummyJSON = {};
    /**
     * @description - validate user
     * @param {Object} req - Request Object.
     * @param {Object} res - Response Object.
     * @param {Function} next - Callback Function.
     * @return {Object} - Token || UNAUTHORIZED
     */
function patchExample(req, res, next) {
    try {
        if (Array.isArray(eval(req.body.body)) && eval(req.body.body).length !==0) {
            jsonPatch.apply(DummyJSON, eval(req.body.body));
            return res.status(httpStatus.OK).json({
                body: DummyJSON
            });
        } else {
            const error = (function() {
                if (!Array.isArray(req.body.body)) {
                    return 'INVALID TYPE';
                } else if (req.body.body.length === 0){
                    return 'EMPTY ARRAY';
                }
            })();
            logger.error(error);
            return res.status(httpStatus.BAD_REQUEST).json({
                error
            });
        }
    } catch (Exception) {
        logger.error(Exception);
        return next (Exception);
    }
}

module.exports = {
    patchExample
}
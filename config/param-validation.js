const Joi = require('joi');

module.exports = {
    /**
     * @description - Dynamic Schema.
     */
    // POST - login.
    login: {
        body: {
            uname: Joi.string().required(),
            pass: Joi.string().required()
        }
    },
    imageProcess: {
        body: {
            imageurl: Joi.string().required(),
            token: Joi.string().required()
        }
    },
    patchJson: {
        body: {
            token: Joi.string().required()
        }
    }
};
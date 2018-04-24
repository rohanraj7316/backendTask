const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Image APIs', () => {
  describe('# POST /api/auth/image/process', () => {
    it('should return Validation error', (done) => {
      request(app)
        .post('/api/auth/image/process')
        .send({
          
        })
        .except()
        .then()
        .catch()
    })
  });
});

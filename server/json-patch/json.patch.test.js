const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## JSON Patch APIs', () => {
  describe('# POST /api/auth/patch/json', () => {
    it('should return Validation error', (done) => {
      request(app)
        .post('/api/auth/patch/json')
        .send({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTUyNDUzODY4Mn0.LwlDHe1PRwNoAY63uo_4Bad8BENRC8QgZ8asHbEASR0',
          body: [ {op: 'add', path: '/foo', value: 'bar'} ]
        })
        .except(httpStatus.OK)
        .then(res => {
          except(res.body).to.have.property('body');
          done();
        })
        .catch(done);
    })
  });
});

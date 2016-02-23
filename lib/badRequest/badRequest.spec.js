(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const badRequest = require('./index');

  let req;
  let res;

  describe('badRequest error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 400 status code', function() {
      badRequest(req, res);
      expect(res.statusCode).to.equal(400);
    });

    it('should add status, title, detail to response body', function() {
      badRequest(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('400');
      expect(data.title).to.equal('Bad Request');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      badRequest(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/could not be consumed/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      badRequest(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });
  });
})();

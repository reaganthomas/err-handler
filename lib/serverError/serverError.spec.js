(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const serverError = require('./index');

  let req;
  let res;

  describe('serverError error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 500 status code', function() {
      serverError(req, res);
      expect(res.statusCode).to.equal(500);
    });

    it('should add status, title, detail to response body', function() {
      serverError(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('500');
      expect(data.title).to.equal('Internal Server Error');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      serverError(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/unexpected condition/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      serverError(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });

    it('should return error with given error message', function() {
      const error = new Error('something bad happened');
      serverError(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error.message);
    });

    it('should return default error when passed bad error argument', function() {
      const error = {};
      serverError(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/unexpected condition/);
    });
  });
})();

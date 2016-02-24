(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const unauthorized = require('./index');

  let req;
  let res;

  describe('unauthorized error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 401 status code', function() {
      unauthorized(req, res);
      expect(res.statusCode).to.equal(401);
    });

    it('should add status, title, detail to response body', function() {
      unauthorized(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('401');
      expect(data.title).to.equal('Unauthorized');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      unauthorized(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/requires user authentication/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      unauthorized(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });

    it('should return error with given error message', function() {
      const error = new Error('something bad happened');
      unauthorized(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error.message);
    });

    it('should return default error when passed bad error argument', function() {
      const error = {};
      unauthorized(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/requires user authentication/);
    });
  });
})();

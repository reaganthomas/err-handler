(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const forbidden = require('./index');

  let req;
  let res;

  describe('forbidden error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 403 status code', function() {
      forbidden(req, res);
      expect(res.statusCode).to.equal(403);
    });

    it('should add status, title, detail to response body', function() {
      forbidden(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('403');
      expect(data.title).to.equal('Forbidden');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      forbidden(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/refusing to fulfill it/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      forbidden(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });

    it('should return error with given error message', function() {
      const error = new Error('something bad happened');
      forbidden(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error.message);
    });

    it('should return default error when passed bad error argument', function() {
      const error = {};
      forbidden(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/refusing to fulfill it/);
    });
  });
})();

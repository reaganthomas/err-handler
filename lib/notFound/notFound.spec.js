(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const notFound = require('./index');

  let req;
  let res;

  describe('notFound error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 404 status code', function() {
      notFound(req, res);
      expect(res.statusCode).to.equal(404);
    });

    it('should add status, title, detail to response body', function() {
      notFound(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('404');
      expect(data.title).to.equal('Not Found');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      notFound(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/not found/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      notFound(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });

    it('should return error with given error message', function() {
      const error = new Error('something bad happened');
      notFound(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error.message);
    });

    it('should return default error when passed bad error argument', function() {
      const error = {};
      notFound(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/not found/);
    });
  });
})();

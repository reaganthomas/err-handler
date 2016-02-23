(function IIFE() {
  'use strict';

  const httpMocks = require('node-mocks-http');
  const expect = require('chai').expect;

  const forbidden = require('./index');

  let req;
  let res;

  describe('notFound error', function() {
    beforeEach(function() {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it('should return 404 status code', function() {
      forbidden(req, res);
      expect(res.statusCode).to.equal(404);
    });

    it('should add status, title, detail to response body', function() {
      forbidden(req, res);

      const data = JSON.parse(res._getData());
      expect(data.status).to.equal('404');
      expect(data.title).to.equal('Not Found');
      expect(data.detail).to.be.ok;
    });

    it('should return error with default error message', function() {
      forbidden(req, res);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.match(/not found/);
    });

    it('should return error with given error detail', function() {
      const error = 'something bad happened';
      forbidden(req, res, error);

      const data = JSON.parse(res._getData());
      expect(data.detail).to.equal(error);
    });
  });
})();

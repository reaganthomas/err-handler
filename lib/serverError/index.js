(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The server encountered an unexpected condition ' +
    'which prevented it from fulfilling the request.';

  // Doubles as express error handling middleware, hence param swapping
  function serverError(err, req, res, next) {
    let detail;

    if(err instanceof Error || _.is(String, err)) {
      detail = err;
    } else {
      detail = res;
      res = req;
      req = err;
    }

    if(detail instanceof Error) {
      detail = detail.message;
    }

    if(!_.is(String, detail)) {
      detail = null;
    }

    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.serverError);

    return res.status(500).json(error);
  }

  module.exports = serverError;
}());

(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The server understood the request, but is refusing ' +
    'to fulfill it. Authorization will not help and the request should not ' +
    'be repeated.';

  function forbidden(req, res, detail) {
    if(detail instanceof Error) {
      detail = detail.message;
    }

    if(!_.is(String, detail)) {
      detail = null;
    }
    
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.forbidden);

    return res.status(403).json(error);
  }

  module.exports = forbidden;
}());

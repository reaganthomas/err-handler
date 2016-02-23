(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The request requires user authentication.';

  function unauthorized(req, res, detail) {
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.unauthorized);

    return res.status(401).json(error);
  }

  module.exports = unauthorized;
}());

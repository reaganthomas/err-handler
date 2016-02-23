(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The requested resource could not be consumed.';

  function badRequest(req, res, detail) {
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.badRequest);

    return res.status(400).json(error);
  }

  module.exports = badRequest;
}());

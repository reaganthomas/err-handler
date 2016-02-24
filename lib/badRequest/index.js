(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The requested resource could not be consumed.';

  function badRequest(req, res, detail) {
    if(detail instanceof Error) {
      detail = detail.message;
    }

    if(!_.is(String, detail)) {
      detail = null;
    }

    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.badRequest);

    return res.status(400).json(error);
  }

  module.exports = badRequest;
}());

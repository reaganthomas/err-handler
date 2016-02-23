(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The server encountered an unexpected condition ' +
    'which prevented it from fulfilling the request.';

  function serverError(req, res, detail) {
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.serverError);

    return res.status(500).json(error);
  }

  module.exports = serverError;
}());

(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The server has not found anything matching the ' +
    'Request-URI.';

  function notFound(req, res, detail) {
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.notFound);

    return res.status(404).json(error);
  }

  module.exports = notFound;
}());

(function() {
  'use strict';

  const _  = require('ramda');

  const errors = require('../errors');
  const defaultDetail = 'The server has not found anything matching the ' +
    'Request-URI.';

  function notFound(req, res, detail) {
    if(detail instanceof Error) {
      detail = detail.message;
    }

    if(!_.is(String, detail)) {
      detail = null;
    }
    
    const error = _.merge({
      detail: detail || defaultDetail
    }, errors.notFound);

    return res.status(404).json(error);
  }

  module.exports = notFound;
}());

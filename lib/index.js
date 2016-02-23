(function() {
  'use strict';

  module.exports = {
    badRequest: require('./badRequest'),
    unauthorized: require('./unauthorized'),
    forbidden: require('./forbidden'),
    notFound: require('./notFound'),
    serverError: require('./serverError')
  };
}());

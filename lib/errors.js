(function() {
  'use strict';

  module.exports = {
    badRequest: {
      status: '400',
      title: 'Bad Request'
    },
    unauthorized: {
      status: '401',
      title: 'Unauthorized'
    },
    forbidden: {
      status: '403',
      title: 'Forbidden'
    },
    notFound: {
      status: '404',
      title: 'Not Found'
    },
    serverError: {
      status: '500',
      title: 'Internal Server Error'
    }
  };
}());

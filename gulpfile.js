(function IIFE() {
  'use strict';

  const runSequence = require('run-sequence');
  const gulp = require('gulp');

  const config = require('./build-config');

  const plugins = require('gulp-load-plugins')(config.gulpLoadPlugins);

  require('gulp-simple-task-loader')({
    plugins,
    config,
    filenameDelimiter: '-',
    tasknameDelimiter: ':',
    taskDirectory: 'tasks'
  }, gulp);
})();

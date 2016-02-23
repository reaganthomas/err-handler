(function IIFE() {
  'use strict';

  module.exports = function(gulp, config, plugins) {
    return function(cb) {
      gulp.src(['./lib/**/*.js','!./lib/**/*.spec.js'])
        .pipe(plugins.istanbul())
        .pipe(plugins.istanbul.hookRequire())
        .on('finish', function() {
          gulp.src(['./lib/**/*.spec.js'])
            .pipe(plugins.mocha({ reporter: 'spec', timeout: 1000 }))
            .pipe(plugins.istanbul.writeReports({ dir: './coverage' }))
            .pipe(plugins.istanbul.enforceThresholds(config.istanbul))
            .on('end', function() {
              cb();
            });
        });
    };
  };
})();

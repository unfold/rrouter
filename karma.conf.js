module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'node_modules/es5-shim/es5-shim.js'
    ],
    browserify: {
      files: [
        'tests/*.js'
      ]
    },
    preprocessors: {
      '/**/*.browserify': 'browserify'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

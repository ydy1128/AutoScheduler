// Karma configuration
// Generated on Sat Feb 11 2017 14:50:04 GMT-0600 (Central Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.html': ['ng-html2js'],
    },
    ngHTML2JsPreprocessor:{
        moduleName: 'templates'
    },
    // list of files / patterns to load in the browser
    files: [
        //jquery
        './public/lib/jquery-3.1.1.min.js',
        //bootstrap
        './public/lib/bootstrap.min.js',
        './public/lib/select2.min.js',
        //angular
        './public/lib/angular.min.js',
        './public/lib/angular-mocks.js',

        './public/lib/angular-ui-router.js',
        //specs
        './public/spec/*.js',
        //templates
        // './public/index.html',
        './public/templates/*.html',
        //js files
        './public/js/*.js',

    ],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
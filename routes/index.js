// var express = require('express');
// var router = express.Router();

// // var data_doc = require('../public/js/dummie_data.js');

// /* GET home page. */
// router.get('/', function(req, res) {

// });

// module.exports = router;

var express = require('express');

module.exports = (function() {
    'use strict';
    var viewsRoute = express.Router();

    viewsRoute
    .get('/', function(req, res) {
        res.render('index');
        console.log('view index')
    })
    .get('/documents', function(req, res) {
        res.render('documents');
        console.log('view index')

    });
    return viewsRoute;
})();
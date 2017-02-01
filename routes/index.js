var express = require('express');
var router = express.Router();

// var data_doc = require('../public/js/dummie_data.js');

/* GET home page. */
router.get('/class', function(req, res) {
    var db = req.db;
    var collection = db.get('frameitdb');
    collection.find({},{},function(e,docs){
        console.log(docs)
    });
});
module.exports = router;

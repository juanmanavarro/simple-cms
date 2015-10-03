var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var page = mongoose.model('Page');

router.get('/', function(req, res, next) {
    page.find({}, function(err, pages) {
        res.json(pages);
    });
});

router.get('/:id', function(req, res, next) {
    page.findById(req.params.id, function(err, page) {
        if(err) res.json({ message: 'No page found' });

        res.json(page);
    });
});

module.exports = router;

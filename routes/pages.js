var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var page = mongoose.model('Page');

router.get('/', function(req, res, next) {
    page.find({}, function(err, pages) {
        if(err) return console.error(err);

        res.render('pages/list', {
            title: 'All pages',
            pages: pages
        });
    });
});

router.get('/:id', function(req, res, next) {
    page.findById(req.params.id, function(err, page) {
        if(err) return console.error(err);

        res.render('pages/page', {
            title: 'Page texts',
            page: page
        });
    });
});

/*router.get('/:id', function(req, res, next) {
    page.findById(req.params.id, function(err, page) {
        if(err) res.json({ message: 'No page found' });

        res.json(page);
    });
});*/

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var page = mongoose.model('Page');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

router.get('/', function(req, res) {
    page.find({}, function(err, pages) {
        if(err) return console.error(err);

        res.render('pages/list', {
            title: 'All pages',
            pages: pages
        });
    });
});

router.get('/new', function(req, res) {
    res.render('pages/new', {
        title: 'New page'
    });
});

router.post('/', function(req, res) {
    var name = req.body.name;
    page.create({
        name: name
    }, function(err, page) {
        if(err) return console.log(err);

        res.redirect('/pages');
    });
});

router.get('/:id/texts', function(req, res, next) {
    page.findById(req.params.id, function(err, page) {
        if(err) return console.error(err);

        res.render('pages/page', {
            title: 'Page texts',
            page: page
        });
    });
});

router.delete('/:id', function(req, res) {
    page.findById(req.params.id, function(err, page) {
        if(err) return console.error(err);

        page.remove(page.id, function(err, page) {
            res.redirect('/pages');
        });
    });
});

/*router.get('/:id/new', function(req, res, next) {
    res.render('pages/new-text', {
        title: 'New text',
        pageId: req.params.id
    });
});



router.post('/:id/texts', function(req, res) {
    var body = req.body.body;
    text.create({
        body: body
    }, function(err, text) {
        if(err) return console.error(err);

        page.findById(req.params.id, function(err, page) {
            page.update({
                $push: text
            }, function(err, result) {
                if(err) return console.error(err);

                console.log('PAGE', page)
                res.redirect(page.id);
            });
        });
    });
});*/

/*router.delete('/:id/texts/:slug', function(req, res) {
    page.findById(req.params.id, function(req, res) {
        if(err) return console.error(err);

        //page.find
    });
});*/

module.exports = router;

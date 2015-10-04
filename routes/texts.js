var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Page = mongoose.model('Page');
var Text = mongoose.model('Text');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

router.get('/new', function(req, res) {
    Page.findById(req.params.id, function(err, page) {
        if(err) return console.error(err);

        res.render('texts/new', {
            title: 'New text',
            page: page
        });
    });
});

router.post('/', function(req, res) {
    var pageId = req.params.id;
    Text.create({
        body: req.body.body
    }, function(err, text) {
        if(err) return console.error(err);

        Page.findById(pageId, function(err, page) {
            if(err) return console.error(err);

            page.texts.push(text);
            page.save();
            res.redirect('/pages/' + page.id + '/texts');
        });
    });
});

router.delete('/:textId', function(req, res) {
    Page.findById(req.params.id, function(err, page) {
        if(err) return console.error(err);

        page.texts.pull(req.params.textId);
        page.save();
        res.redirect('/pages/' + page.id + '/texts');
    });
})

module.exports = router;

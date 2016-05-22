var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/find/slug/:slug', function(req, res) {

    models.Page.find({
        where: ["slug = '" + req.params.slug + "'"]
    }).then(function(page) {
        res.send(page);
    });

});

module.exports = router;

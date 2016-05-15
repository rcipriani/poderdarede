var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/all', function(req, res) {

models.Captura.findAll().then(function(list) {
    res.json(list);
});

}).get('/:chamadaId/:email', function(req, res) {

    models.Captura.create({
            chamadaId: req.params.chamadaId,
            email: req.params.email
    }).then(function(captura) {
      res.json(captura);
    });

});

module.exports = router;

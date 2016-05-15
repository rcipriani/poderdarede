var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    models.Chamada.findAll().then(function(list) {
        res.json(list);
    });

})

    .get('/truncate', function(req, res) {

        console.log("trucouuu");

        models.Chamada.destroy({
            truncate: true
        }).then(function() {
            res.json("truncou");
        });

    })

    .get('/get/:id', function(req, res) {

        var chamada = {
            id: req.params.id
        };

        models.Chamada.findOne({
            where: ["id = '" + chamada.id + "'"]
        }).then(function(chamada) {
            res.json(chamada);
        });

    })

    .get('/delete/:id', function(req, res) {

        var chamada = {
            id: req.params.id
        };

        models.Chamada.destroy({
            where: ["id = '" + chamada.id + "'"]
        }).then(function() {
            res.json(chamada);
        });

    })

    .post('/create', function(req, res) {

        console.log("###### CREATE #######");
        var chamadaOri = req.body;

        models.Chamada.create(chamadaOri).then(function(chamada) {
            res.json(chamada);
        });

    }).put('/update/:id', function(req, res) {

        console.log("###### UPDATE #######");
        var chamadaOri = req.body;

        models.Chamada.update(chamadaOri, {
            where: ["id = '" + req.params.id + "'"]
        }).then(function(affectedRows) {
            
            if(affectedRows > 0){
                 res.json(chamadaOri);
            }
            res.json(null);
        });

    });

module.exports = router;
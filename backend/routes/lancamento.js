var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    models.Lancamento.findAll().then(function(list) {
        res.send(list);
    });

}).get('/delete/:id', function(req, res) {

    models.Lancamento.destroy({
        where: ["id = '" + req.params.id + "'"]
    }).success(function() {
        res.send(true);
    });

}).get('/find/:id', function(req, res) {

    models.Lancamento.find({
        where: ["id = '" + req.params.id + "'"]
    }).success(function(lancamento) {
        res.send(lancamento);
    });

}).get('/add/:id', function(req, res) {

    var lancamento = {
        id: req.params.id,
        descricao: "Descrição teste " + req.params.id,
        valor: 1000,
        data: "02-09-1985",
        tipo: 1
    };

    models.Lancamento
        .build(lancamento)
        .save()
        .success(function(anotherTask) {
            console.log("Adicionado");
            // you can now access the currently saved task with the variable anotherTask... nice!
        }).error(function(error) {
             console.log("Falha ao salvar: " + error);
            // Ooops, do some error-handling
        });
        
    res.send("Adicionado!?");

});

module.exports = router;
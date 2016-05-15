var app = require('../app');
var debug = require('debug')('init:server');
var http = require('http');
var models = require("../models");

//var port = normalizePort(process.env.PORT || '21021');
//app.set('port', port);
app.set('port', process.env.PORT_APP || 21021);

var server = http.createServer(app);

models.sequelize.sync().then(function() {
    console.log("Server rodando na porta "+ app.get('port'))
    server.listen(app.get('port'));
    server.on('error', onError);
    server.on('listening', onListening);
});

function normalizePort(val) {
    console.log("Inicializando server na porta ????!")
}
function onError(error) {
    console.log("Erro no server!")
}
function onListening() {
    console.log("Server está Listening!")
}
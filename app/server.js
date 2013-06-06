'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var consolidate = require('consolidate');

app.engine('jade', consolidate.jade);
app.set('view engine', 'jade');
app.set('views', './public/views');

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);

app.get('/', function(req, res){
    res.render('index', { greeting: 'hello' });
});

exports = module.exports = server;

exports.use = function() {
    app.use.apply(app, arguments);
};
'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


var consolidate = require('consolidate');

app.engine('jade', consolidate.jade);
app.set('view engine', 'jade');
app.set('views', './public');


io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// use LiveReload middleware
app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);


app.get('/', function(req, res) {
    res.render('views/index.html', { greeting: 'hello!' });
    // res.send('bonjour!');
});

// Static file URLs
// app.use( '/images',     express.static(__dirname + '/public/images'));
// app.use( '/styles',     express.static(__dirname + '/public/styles'));
// app.use( '/javascript', express.static(__dirname + '/public/javascript'));


// Start the server
exports = module.exports = server;

exports.use = function() {
    app.use.apply(app, arguments);
};
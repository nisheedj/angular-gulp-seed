/**
 * Use the node server to mock restfull api responses
 * as well as data transfer via socket.io
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var colors = require('colors/safe');

var app = express();
var server = http.Server(app);

/*Set static resources*/
app.use('/css', express.static(path.join(__dirname, 'app', 'css')));
app.use('/js', express.static(path.join(__dirname, 'app', 'js')));
app.use('/img', express.static(path.join(__dirname, 'app', 'img')));
app.use('/fonts', express.static(path.join(__dirname, 'app', 'fonts')));
app.use('/partials', express.static(path.join(__dirname, 'app', 'partials')));

/*Base index file*/
app.get('/', function(req, res) {
  console.log(colors.green('Route requested : %s'),req.route.path);
  res.sendFile('index.html', {
    root: __dirname + '/app/'
  });
});


server.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log(colors.green('Example app listening at http://%s:%s'), host, port);
});
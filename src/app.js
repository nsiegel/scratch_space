var express = require('express');
var swig = require('swig');
var io = require('socket.io');
var routes = require('./routes');
var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);

app.use(routes);
app.use(express.static(__dirname + '/static'));

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, '0.0.0.0', function() {
  console.log('listening on port ' + PORT);
});

var listener = io.listen(server);

listener.sockets.on('connection', function(socket) {
  socket.emit('message', {'message': 'hello world'});
  socket.on('draw', function(data) {
    socket.emit('draw', data);
  });
});

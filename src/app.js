var express = require('express');
var swig = require('swig');
var routes = require('./routes');
var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(routes);
app.use(express.static(__dirname + '/static'));

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});

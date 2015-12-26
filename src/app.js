var express = require('express');
var swig = require('swig');
var routes = require('./routes');
var app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(routes);

app.listen(3000, function() {
  console.log('listening on port 3000');
});

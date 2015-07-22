var express = require('express');
var app = module.exports = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('json spaces', 2);
app.set('x-powered-by', false);
app.set('etag', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET || 'this is not secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', require('./controllers/auth'));
app.use('/api/v1', require('./controllers/turbasen'));

if (!module.parent) {
  app.listen(process.env.APP_PORT);
  console.log('Backend started on port ' + process.env.APP_PORT);
}

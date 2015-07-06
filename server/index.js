var express = require('express');
var app = module.exports = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set('json spaces', 2);
app.set('x-powered-by', false);
app.set('etag', false);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', require('./controllers/auth'));
app.use('/api/v1', require('./controllers/turbasen'));

if (!module.parent) {
  app.listen(process.env.APP_PORT);
  console.log('Backend started on port ' + process.env.APP_PORT);
}

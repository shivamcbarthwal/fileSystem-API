var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

// import the Routes
var indexRouter = require('./routes/index');
var uploadsRouter = require('./routes/upload');
var browseRouter = require('./routes/browse');
var downloadRouter = require('./routes/download');
var removeRouter = require('./routes/remove');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log(__dirname);
app.set('db/uploads', path.join(__dirname, 'db/uploads'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

// enable cross-origin-resource-sharing
let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, " +
      "Content-Type, Accept, Cache-Control");
  if ('OPTIONS' == req.method){
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

// load the routing modules
app.use('/', indexRouter);
app.use('/upload', uploadsRouter);
app.use('/browse', browseRouter);
app.use('/download', downloadRouter);
app.use('/remove', removeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app

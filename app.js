var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wtiRouter = require('./routes/wti');
var exchangeRouter = require('./routes/exchangeRate');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/wti', wtiRouter)
app.use('/users', usersRouter);
app.use('/exchange', exchangeRouter);
//socket 연결
app.io = require('socket.io')();

app.io.on('connection',(socket) => {
  console.log('user connect!');

  socket.on('disconnect', () => {
      console.log('user disconnect!');
  });

  socket.on('get-stock-info', (msg) => {

    // msg로 받아온 주식 티커 json을 리스트로 변경
     // msg.data
    var test_data = ['aapl', 'tsla', 'inmd'];
// stock.js라는 곳에서 최신 가격을 전달 받아서 json으로 전달
    app.io.emit('get-stock-info', msg);
  });


});



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

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ExchangeRate = require('./js/exchangeRate');
// const Wti =  require('./routes/wti');
const redis = require('redis');
const Nasdaq_future = require('./js/nasdaq_future');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { ConsoleMessage } = require('puppeteer');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// redis middleware

  // 소켓 연결 시간마다 데이터 업데이트
  // setInterval(async () => {
  //   const exchangeRate = await ExchangeRate.getExchangeRate();
  //   // const wti = await Wti.getWti();
  //   const Nasdaq = await Nasdaq_future.getNasdaqFutureIndex();
  //   io.emit('financial-info', JSON.stringify([...exchangeRate,  ... Nasdaq]));
  // }, 60000);


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

// 서버 시작
http.listen(3300, () => {
  console.log('Server is listening on port 3300');
});
module.exports = app;



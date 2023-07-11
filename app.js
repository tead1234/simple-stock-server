const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redisClient = require('./js/caching');

const redisCli = redisClient();
const getData = (key) => {
  return new Promise((resolve, reject) => {
    redisCli.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// setInterval(() => Data('please'), 3000);
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

// websocket
io.on('connection', (socket) => {
  console.log('user connected!');

  socket.on('disconnect', () => {
    console.log('user disconnected!');
  });

  // 소켓 연결 시간마다 데이터 업데이트
  setInterval( async () => {
    // redis data
    let fi_data = await getData('financial-info');
    let news_data = await getData('cnbcNews');
    io.emit('financial-info', fi_data);
    io.emit('newsCnbc', news_data);
  }, 60000);
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

// 서버 시작
http.listen(3300, () => {
  console.log('Server is listening on port 3300');
});
module.exports = app;



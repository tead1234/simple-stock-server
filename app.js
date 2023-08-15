const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ExchangeRate = require('./js/exchangeRate');
const Wti =  require('./js/wti');
const redisClient = require('./js/caching');
const Nasdaq_future = require('./js/nasdaq_future');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { ConsoleMessage } = require('puppeteer');
const { stringify } = require('querystring');
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
async function saveFinancialData(key, v){
  const Client = await redisClient();
  await Client.set(key, v, 'EX', 60000);
} 

// redis middleware
setInterval(async () =>{
  ///
    const nasdaq = await Nasdaq_future.getNasdaqFutureIndex();
    const exchange = await ExchangeRate.getExchangeRate();
    // const wti = await Wti.getWti();
    // console.log(nasdaq, exchange);
   saveFinancialData('financial-info', [...nasdaq, ...exchange].toString() );
  //  await console.log("보냄");
  //
}, 60000)
  


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



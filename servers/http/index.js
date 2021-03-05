const path = require('path');
const createError = require('http-errors');
// const helmet = require('helmet');
// const logger = require('logger').express;
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const log = require('logger').common;
// const log = require('pino');
// const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

// Роуты
const indexRouter = require('routes/http/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

// app.use(logger); // логер. Там внутри pino
// app.use(helmet()); // хелмет фильтрует вредные заголовки и кривые запросы. Смотри доку хелмета для подробностей.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    secret: 'ds23$%sdww3f',
    cookie: {
      path: '/',
      httpOnly: true, 
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
)

require('controllers/auth/local-strategy');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../../public')));

// это специальный мидлвейр, который выключает роуты. Используеться раннером чтобы роуты не стали доступны раньше времени.
let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503)); // код 503 это "сервис временно недоступен", другими словами - сервер живой, но занят чем-то другим, постучите позже.
});

// Routes prefix
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status !== 404) {
    log.error(err);
  }

  res.status(err.status || 500);
  res.end();
});

// Включатель роутов
const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    log.info('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;

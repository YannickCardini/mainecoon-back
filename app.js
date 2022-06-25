var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const ipfilter = require('express-ipfilter').IpFilter

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express()

// Allow the following IPs
const ips = ['127.0.0.1']

// Create the server
app.use(ipfilter(ips, { mode: 'allow' }))


var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var parent = require('./routes/parent');
var teacher = require('./routes/teacher');
var student = require('./routes/student');
var school = require('./routes/school');
var _class = require('./routes/class');
var subject = require('./routes/subject');
var room = require('./routes/room');
var classRoom = require('./routes/classRoom');
var attendance = require('./routes/attendance');
var exam = require('./routes/exam');
var fees = require('./routes/fees');
var marksSubject= require('./routes/marksSubject');
var paid= require('./routes/paid');
var teachers= require('./routes/teachers');
var studentsProcesses= require('./routes/studentsProcesses');
var year= require('./routes/year');
var system= require('./routes/system');
var admins = require('./routes/admins');
var clothes= require('./routes/clothes');
var TSC= require('./routes/teacherSubjectClass');
var evaluation = require('./routes/evaluation');
var driver = require('./routes/driver');
var bus = require('./routes/bus');
var tasks = require('./routes/task');
var transferProcess = require('./routes/transferProcess');
var inOutcomeTypes = require('./routes/inOutcomeType');
var inOutcome = require('./routes/inOutcome');
var nationality = require('./routes/nationality');
var check = require('./routes/check');
var vaccination = require('./routes/vaccination');
var others = require('./routes/other');
var committee = require('./routes/committee');
var conversation = require('./routes/conversation');
var mobile = require('./routes/mobile');
var order = require('./routes/order');



var app = express();

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/school',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session(
  { 
    store: store,
    secret: 'SEKR37',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/parent',parent);
app.use('/teacher', teacher);
app.use('/student',student);
app.use('/school',school);
app.use('/class',_class);
app.use('/subject',subject);
app.use('/room',room);
app.use('/classRoom',classRoom);
app.use('/attendance',attendance);
app.use('/exam',exam);
app.use('/fees',fees);
app.use('/marksSubject',marksSubject);
app.use('/paid',paid);
app.use('/teachers',teachers);
app.use('/studentsProcesses',studentsProcesses);
app.use('/year',year);
app.use('/system',system);
app.use('/admins', admins);
app.use('/clothes',clothes);
app.use('/TSC',TSC);
app.use('/evaluation',evaluation);
app.use('/driver',driver);
app.use('/bus',bus);
app.use('/tasks',tasks);
app.use('/transferProcess',transferProcess);
app.use('/inOutcomeTypes',inOutcomeTypes);
app.use('/inOutcomes',inOutcome);
app.use('/nationality',nationality);
app.use('/checks',check);
app.use('/vaccinations',vaccination);
app.use('/others',others);
app.use('/committee',committee);
app.use('/conversation',conversation);
app.use('/mobile',mobile);
app.use('/order',order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
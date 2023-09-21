var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv=require('dotenv');
const jwt = require('jsonwebtoken');
const cors=require('cors');

var indexRouter = require('./routes/index');
var pageRouter = require('./routes/page');
var contactRouter = require('./routes/contact');

var courseRouter = require('./routes/course');
var loginRouter = require('./routes/login');

var recipeRouter = require('./routes/recipe');


var app = express();
dotenv.config();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//suojaamattomat endpointit
app.use('/', indexRouter);
app.use('/contact', contactRouter);

app.use('/login', loginRouter);

app.use('/recipe', recipeRouter);

//app.use(authenticateToken);
//suojatut endpointit
app.use('/course', courseRouter);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }



module.exports = app;

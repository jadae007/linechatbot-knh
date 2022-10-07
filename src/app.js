const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const opdAuthCode = require('./routes/opdAuthCode');
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/api/opd', opdAuthCode);

module.exports = app;

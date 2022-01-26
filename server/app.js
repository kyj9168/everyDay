const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const approot = require('app-root-path');
const configfile = require(`${approot}/config/config.json`);
const runmode = configfile.runmode;
const config = configfile[runmode];
const indexRouter = require('./routes/index');
const port = config.EXPRESS_PORT;
var cookieParser = require('cookie-parser');
let sessionParser = require('express-session');
let FileStore = require('session-file-store')(sessionParser); // 1

app.use(cookieParser());

app.use(
    sessionParser({
        key: 'sid',
        secret: 'youngjun',
        resave: false,
        saveUninitialized: true,
        store: new FileStore({ reapInterval: 60 * 60 * 24 }),
        cookie: {
            maxAge: 1000 * 60 * 60, // 쿠키 유효기간 1시간
        },
    })
);
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
    })
);
app.use(
    bodyParser.json({
        limit: '50mb',
    })
);

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/', indexRouter);
// app.get('/*', function (req, res) {
//   res.redirect('/chat');
// });
app.listen(port, function () {
    console.log(`listening on port ${port}!`);
});

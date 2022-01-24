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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/', indexRouter);
// app.get('/*', function (req, res) {
//   res.redirect('/chat');
// });
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});


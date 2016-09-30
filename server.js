'use strict';

let express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    Database = require('./lib/database');

app.use(bodyParser.json());

app.post('/login', (req, res, next) => {
  if (typeof req.body.user === 'undefined' || typeof req.body.database === 'undefined') next({ status: 400, message: 'Missing credentials' });

  let credentials = { user: req.body.user, password: req.body.password };
  let database = new Database(req.body.database);

  database.connect(credentials).then(() => {
    res.send('OK'); 
  }).catch((err) => {
    next({ status: 401, message: err });
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(8080);

module.exports = app;

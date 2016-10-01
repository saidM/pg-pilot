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

  // Try to make a connection to the database
  database.connect(credentials).then(() => {
    // Now get all the tables
    return database.getTables();
  }).then((data) => {
    app.set('pg', database); // Save the Database instance (so we can re-use it in all the routes)
    res.json(data);
  }).catch((err) => {
    app.set('pg', null); // Empty the PG client
    next({ status: 401, message: err });
  });
});

app.post('/query', isConnected, (req, res, next) => {
  app.get('pg').query(req.body.sql).then((data) => {
    res.send(data);
  }).catch((err) => {
    next({ status: 500, message: err });
  });
});


function isConnected(req, res, next) {
  if (!app.get('pg')) next({ status: 401, message: 'You must be connected to the database' });
  next();
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(8080);

module.exports = app;

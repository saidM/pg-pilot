'use strict';

const express   = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    Database    = require('./lib/database');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', (req, res, next) => {
  if (typeof req.body.user === 'undefined' || typeof req.body.database === 'undefined') next({ status: 400, message: 'Missing credentials' })

  const credentials = req.body
  const database = new Database(req.body.database)

  const connect = database.connect(credentials),
  getTables   = database.getTables()

  // Try to make a connection to the database
  Promise.all([connect, getTables]).then((values) => {
    // Save the Database instance (so we can re-use it in all the routes)
    app.set('pg', database)

     // Render the tables
    res.json(values[1])
  }).catch((err) => {
     // Empty the PG client
    app.set('pg', null)

    // On to the error middleware
    next({ status: 401, message: err })
  })
})

app.get('/tables/:name', (req, res, next) => {
  app.get('pg').getTable(req.params.name).then((data) => {
    res.send(data)
  }).catch((err) => {
    next({ status: 500, message: err })
  })
})

app.post('/query', isConnected, (req, res, next) => {
  app.get('pg').query(req.body.sql).then((data) => {
    res.send(data)
  }).catch((err) => {
    next({ status: 500, message: err })
  })
})

app.get('/export', isConnected, (req, res, next) => {
  app.get('pg').export().then((dump) => {
    res.send(dump)
  }).catch((err) => {
    next({ status: 500, message: err })
  })
})

app.post('/import', isConnected, (req, res, next) => {
  if (typeof req.body.sql === 'undefined') next({ status: 400, message: 'Missing SQL dump' })

  app.get('pg').import(req.body.sql).then(() => {
    res.send('Import OK')
  }).catch((err) => {
    next({ status: 500, message: err })
  })
})


function isConnected(req, res, next) {
  if (!app.get('pg')) next({ status: 401, message: 'You must be connected to the database' })
  next()
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
});

app.listen(8080)

module.exports = app

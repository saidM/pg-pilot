'use strict';

const express     = require('express'),
      path        = require('path'),
      app         = express(),
      bodyParser  = require('body-parser'),
      Database    = require('./lib/database')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('build'))

app.post('/login', (req, res, next) => {
  if (typeof req.body.user === 'undefined' || typeof req.body.database === 'undefined') {
    next({ status: 400, message: 'Missing credentials' })
  }

  const credentials = req.body,
  database          = new Database(req.body.database)

  const connect   = database.connect(credentials),
        getTables = database.getTables()

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

app.delete('/logout', (req, res, next) => {
  app.set('pg', null)
  res.json({ success: true })
})

app.get('/tables', isConnected, (req, res, next) => {
  app.get('pg').getTables().then((data) => {
    res.send(data)
  }).catch((err) => {
    next({ status: 500, message: err })
  })
})

app.get('/tables/:name', isConnected, (req, res, next) => {
  app.get('pg').getTable(req.params.name).then((data) => {
    res.send(data)
  }).catch((err) => {
    next({ status: 404, message: err })
  })
})

app.get('/tables/:name/:id(\\d+)', isConnected, (req, res, next) => {
  app.get('pg').getRow(req.params.name, req.params.id)
    .then(data => res.send(data))
    .catch(err => next({ status: 404, message: err }))
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
    res.contentType('application/octet-stream')
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

// Serve all the React routes from here
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})

function isConnected(req, res, next) {
  if (!app.get('pg')) next({ status: 401, message: 'You must be connected to the database' })
  next()
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

const port = process.argv[2] || 8080
app.listen(port, () => {
  process.stdout.write(`PG-Pilot starting at: http://localhost:${port}`)
})

module.exports = app

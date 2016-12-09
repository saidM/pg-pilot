#! /usr/bin/env node
'use strict'

const argv    = require('minimist')(process.argv.slice(2)),
      path    = require('path'),
      spawn   = require('child_process').spawn

// Grab the port from the command or set a default one
const port  = argv.port || argv.p || 8080

// Start the process inside a detached process
const start = spawn('node', ['/usr/local/lib/node_modules/pg-pilot/server.js', port], {
  detached: true
})

start.stdout.on('data', (data) => {
  // Display the starting message from the Express server
  console.log(data.toString())
  // We can now safely exit the current process (child process will keep running)
  process.exit()
})

// If there is any error, display it as well
start.stderr.on('data', (data) => console.log(data.toString()))
start.on('error', (data) => console.log(data.toString()))

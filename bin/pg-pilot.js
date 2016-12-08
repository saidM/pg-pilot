#! /usr/bin/env node
'use strict'

const argv    = require('minimist')(process.argv.slice(2)),
      spawn   = require('child_process').spawn

const port  = argv.port || argv.p || 8080
const child = spawn('node', ['server.js', port], { detached: true })

child.stdout.on('data', (data) => console.log('OK', data.toString()))

child.stderr.on('data', (data) => {
  console.log('error')
  console.log('PG-Pilot starting on port 8080..')
  process.exit()
})

# PG-Pilot

[![Build Status](https://travis-ci.org/saidM/pg-pilot.svg?branch=master)](https://travis-ci.org/saidM/pg-pilot) [![Coverage Status](https://coveralls.io/repos/github/saidM/pg-pilot/badge.svg)](https://coveralls.io/github/saidM/pg-pilot) [![NPM Downloads](https://img.shields.io/npm/dt/pg-pilot.svg)](https://www.npmjs.com/package/pg-pilot) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/saidM/pg-pilot)

[![NPM](https://nodei.co/npm/pg-pilot.png?downloads=true)](https://nodei.co/npm/pg-pilot/)

Manage your PostgreSQL databases directly in your browser. 

Tool written using Node.js on the backend and React on the frontend. Current features include:

- Tables structure (columns & indexes)
- Tables rows
- Views
- SQL query execution
- Database export
- SQL file import

# Installation

    npm install -g pg-pilot

You may need to run the command above as sudo (based on your system settings).

# Usage

    pg-pilot
    
It runs by default on the port 8080. You can easily change that behavior by appending the port to the command:

    pg-pilot -p 3000
    
# Roadmap

Upcoming features include:

- Edit table structure
- Delete table
- Delete view
- Add & edit row

Contributions are welcome as long as they include tests.

# Licence

MIT

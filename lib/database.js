'use strict';

let pg = require('pg'),
    exec = require('child_process').exec;

class Database {
  constructor(db) {
    this.database = db;
    this.client;
    this.tables = [];
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client = new pg.Client({ database: this.database });
      this.client.connect((err) => {
        if (err) reject(err);
        resolve(this.client);
      });
    });
  }

  getTables() {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection');

      this.client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'", (err, result) => {
        if (err) reject(err);

        this.tables = [];
        
        result.rows.forEach((row) => {
          this.tables.push(row.table_name);
        });

        resolve(this.tables);
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection');

      this.client.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  export() {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection');

      exec(`pg_dump ${this.database}`, (err, stdout, stderr) => {
        if (err) reject(err);
        if (stderr) reject(stderr);
        resolve(stdout);
      });
    });
  }
}

module.exports = Database;

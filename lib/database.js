'use strict';

let pg = require('pg');

class Database {
  constructor(db) {
    this.database = db;
    this.connected = false;
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
}

module.exports = Database;

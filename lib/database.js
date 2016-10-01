'use strict';

let pg = require('pg'),
    exec = require('child_process').exec,
    fs = require('fs');

class Database {
  constructor(db) {
    this.database = db;
    this.client;
    this.tables = [];
  }

  connect(credentials) {
    return new Promise((resolve, reject) => {
      if (typeof credentials.user === 'undefined') reject('Missing credentials');

      this.client = new pg.Client({ user: credentials.user, password: credentials.password, database: this.database });
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

        resolve({ tables: this.tables });
      });
    });
  }

  getTable(name) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection');

      this.client.query("SELECT column_name, column_default, is_nullable, data_type FROM information_schema.columns WHERE table_schema = 'public'", (err, result) => {
        if (err) reject(err);
        resolve(result.fields);
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
  
  import(sql) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection');

      let timestamp = new Date().getTime();

      // Create a temporary file with the SQL passed in the method
      fs.writeFile(`${timestamp}.sql`, sql, (err) => {
        if (err) reject(err);

        // Execute pg_dump with the newly created file
        exec(`psql -d ${this.database} -f ${timestamp}.sql`, (err, stdout, stderr) => {
          if (err) reject(err);
          if (stderr) reject(stderr);

          // SQL import succeeded at this point. Delete the temporary file created
          fs.unlink(`${timestamp}.sql`, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      });
    });
  }
}

module.exports = Database;

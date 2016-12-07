'use strict';

const pg = require('pg'),
    exec = require('child_process').exec,
    fs = require('fs')

class Database {
  constructor(db) {
    this.database = db
    this.client
    this.tables = []
  }

  connect(credentials) {
    return new Promise((resolve, reject) => {
      if (typeof credentials.user === 'undefined') return reject('Missing credentials')

      this.client = new pg.Client({ user: credentials.user, password: credentials.password, database: this.database })
      this.client.connect((err) => {
        if (err) reject(err);
        resolve(this.client);
      })
    })
  }

  getTables() {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      // Get all the tables and views
      this.client.query("SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'public'", (err, result) => {
        if (err) reject(err)

        let tables = []
        let views = []
        result.rows.forEach(row => {
          // Is the current row a table or a view?
          if (row.table_type == 'VIEW') {
            views.push(row.table_name)
          } else {
            tables.push(row.table_name)
          }
        })

        // const database = 'test'
        resolve({ tables, views })
      })
    })
  }

  getTable(name) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      // Select all the table fields
      this.client.query("SELECT column_name, column_default, is_nullable, data_type FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'", [name], (err, result) => {
        if (err) reject(err)

        // Select all the table indexes
        this.client.query("SELECT indexname, indexdef FROM pg_indexes WHERE tablename = $1", [name], (err2, result2) => {
          if (err2) reject(err2)

          // Select all the table rows
          this.client.query(`SELECT * FROM ${name}`, (err3, result3) => {
            if (err3) reject(err3)

            if (typeof result3 === 'undefined') {
              reject(`relation "${name}" does not exist`)
            } else {
              resolve({ fields: result.rows, indexes: result2.rows, rows: result3.rows })
            }
          })
        })
      })
    })
  }

  getRow(table, id) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      // Select all the table fields
      this.client.query(`SELECT * FROM ${table} WHERE id = $1`, [id], (err, result) => {
        if (err) return reject(err)

        if (typeof result.rows[0] === 'undefined') {
          reject('Row was not found')
        } else {
          resolve(result.rows[0])
        }
      })
    })
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      this.client.query(sql, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  export() {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      exec(`pg_dump ${this.database}`, (err, stdout, stderr) => {
        if (err) reject(err)
        if (stderr) reject(stderr)
        resolve(stdout)
      })
    })
  }

  import(sql) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') reject('There is no connection')

      const timestamp = new Date().getTime()

      // Create a temporary file with the SQL passed in the method
      fs.writeFile(`${timestamp}.sql`, sql, (err) => {
        if (err) reject(err)

        // Execute pg_dump with the newly created file
        exec(`psql -d ${this.database} -f ${timestamp}.sql`, (err, stdout, stderr) => {
          if (err) reject(err)
          if (stderr) reject(stderr)

          // SQL import succeeded at this point. Delete the temporary file created
          fs.unlink(`${timestamp}.sql`, (err) => {
            if (err) reject(err)
            resolve()
          });
        });
      });
    });
  }
}

module.exports = Database;

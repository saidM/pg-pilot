import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Import extends Component {
  handleSubmit(e) {
    e.preventDefault()

    axios.post('http://127.0.1:8080/import', { sql: this.refs.sql.value })
      .then(response => {
        alert('Import succeeded. You are going to be redirected..')
        browserHistory.push('/')
      })
      .catch(err => alert('Import failed: invalid SQL dump'))
  }

  render() {
    return (
      <section>
        <h1>Import</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>SQL Dump</h2>
          <textarea ref="sql" placeholder="Enter SQL Dump here.."></textarea>
          <input type="submit" value="Import Dump" />
        </form>
      </section>
    )
  }
}

export default Import

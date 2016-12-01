import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Connect extends Component {
  handleSubmit(e) {
    e.preventDefault()

    const credentials = { database: this.refs.database.value, user: this.refs.user.value, password: this.refs.password.value }

    axios.post('http://127.0.1:8080/login', credentials)
      .then(response => browserHistory.push('/'))
      .catch(err => alert('Invalid credentials'))
  }

  render() {
    return (
      <div id="connect">
        <h1>PG-Pilot</h1>
        <h2>Use the form below to connect to one or your PostgreSQL databases.</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p>
            <label for="database">Database</label>
            <input type="text" ref="database" id="database" />
          </p>
          <p>
            <label for="user">User</label>
            <input type="text" ref="user" id="user" />
          </p>
          <p>
            <label for="password">Password</label>
            <input type="password" ref="password" id="password" />
          </p>
          <p>
            <input type="submit" value="connect" />
          </p>
        </form>
      </div>
    )
  }
}

export default Connect

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Connect extends Component {
  handleSubmit(e) {
    e.preventDefault()

    const credentials = { host: this.refs.database.host, database: this.refs.database.value, user: this.refs.user.value, password: this.refs.password.value }

    axios.post('/login', credentials)
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
            <label htmlFor="host">Host</label>
            <input type="text" ref="host" id="host" defaultValue="localhost" />
          </p>
          <p>
            <label htmlFor="database">Database</label>
            <input type="text" ref="database" id="database" required />
          </p>
          <p>
            <label htmlFor="user">User</label>
            <input type="text" ref="user" id="user" required />
          </p>
          <p>
            <label htmlFor="password">Password</label>
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

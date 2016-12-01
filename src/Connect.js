import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Connect extends Component {
  handleSubmit(e) {
    e.preventDefault()

    const credentials = { database: this.refs.database.value, user: this.refs.user.value, password: this.refs.password.value }

    axios.post('http://127.0.1:8080/login', credentials)
      .then(response => browserHistory.push('/'))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <h1>Connect</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="database" />
          <input type="text" ref="user" />
          <input type="password" ref="password" />
          <input type="submit" value="connect" />
        </form>
      </div>
    )
  }
}

export default Connect

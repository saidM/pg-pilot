import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class Header extends Component {
  constructor() {
    super()
    this.state = { database: null }
  }
  
  componentDidMount() {
    axios.get('http://127.0.1:8080/tables')
      .then(response => this.setState({ database: response.data.database }))
      .catch(err => browserHistory.push('/connect'))
  }

  handleLogout(e) {
    e.preventDefault()

    axios.delete('http://127.0.1:8080/logout')
      .then(response => {
        // Empty the state (database name)
        this.setState({ database: null })
        // Redirect to the connection route
        browserHistory.push('/connect')
      })
      .catch(err => alert(err))
  }

  render() {
    return (
      <header>
        <ul>
          <li>PG-Pilot</li>
          <li><Link to="/query">Perform SQL query</Link></li>
          <li><Link to="/import">Import File</Link></li>
          <li><a href="http://localhost:8080/export">Export Database</a></li>
          <li className="right"><strong>{this.state.database}</strong> <a href="#" onClick={this.handleLogout.bind(this)}>Switch database</a></li>
        </ul>
      </header>
    )
  }
}

export default Header

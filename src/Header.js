import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class Header extends Component {
  handleLogout(e) {
    e.preventDefault()

    axios.delete('http://127.0.1:8080/logout')
      .then(response => {
        // Empty the state (database name, tables & views)
        this.setState({ database: null, tables: null, views: null })
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
          <li className="right"><strong>{this.props.database}</strong> <a href="#" onClick={this.handleLogout.bind(this)}>Switch database</a></li>
        </ul>
      </header>
    )
  }
}

export default Header

import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class Header extends Component {
  handleLogout(e) {
    e.preventDefault()

    axios.delete('http://127.0.1:8080/logout')
      .then(response => browserHistory.push('/connect'))
      .catch(err => alert(err))
  }

  render() {
    return (
      <header>
        <ul>
          <li>PG-Pilot</li>
          <li><Link to="/query">Perform SQL query</Link></li>
          <li><a href="">Import File</a></li>
          <li><a href="http://localhost:8080/export">Export Database</a></li>
          <li className="right"><strong>profacture_dev</strong> <a href="" onClick={this.handleLogout}>Switch database</a></li>
        </ul>
      </header>
    )
  }
}

export default Header

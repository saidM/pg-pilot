import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          <li>PG-Pilot</li>
          <li><a href="">Perform SQL query</a></li>
          <li><a href="">Import File</a></li>
          <li><a href="">Export Database</a></li>
          <li className="right"><strong>profacture_dev</strong> <a href="">Switch database</a></li>
        </ul>
      </header>
    )
  }
}

export default Header

import React, { Component } from 'react'
import { Link } from 'react-router'

class Tables extends Component {
  render() {
    const tables = this.props.tables.map(table => {
      return (
        <li key={table}><a href={table}>{table}</a></li>
      )
    })

    return (
      <aside>
        <h3>Tables</h3>
        <ul>{tables}</ul>
      </aside>
    )
  }
}

export default Tables

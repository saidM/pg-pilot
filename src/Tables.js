import React, { Component } from 'react'
import { Link } from 'react-router'

class Tables extends Component {
  render() {
    const tables = this.props.tables.map(table => {
      const tableLink = `/tables/${table}/structure`

      return (
        <li key={table}><Link to={tableLink}>{table}</Link></li>
      )
    })

    return (
      <aside>
        <div>
          <h3>Tables</h3>
          <ul>{tables}</ul>
        </div>
      </aside>
    )
  }
}

export default Tables

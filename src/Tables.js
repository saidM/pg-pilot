import React, { Component } from 'react'
import Table from './Table'

class Tables extends Component {
  render() {
    const tables = this.props.tables.map(table => <Table key={table.id} table={table} />)

    return (
      <div>
        <h2>Tables</h2>
        <ul>{tables}</ul>
      </div>
    )
  }
}

export default Tables

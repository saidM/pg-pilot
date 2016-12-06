import React, { Component } from 'react'

class Tables extends Component {
  render() {
    const tables = this.props.tables.map(table => {
      const tableLink = `/tables/${table}/structure`

      return (
        <li key={table}><a href={tableLink}>{table}</a></li>
      )
    })

    const views = this.props.views.map(view => {
      const viewLink = `/views/${view}`

      return (
        <li key={view}><a href={viewLink}>{view}</a></li>
      )
    })

    return (
      <aside>
        <div>
          <h3>Tables</h3>
          <ul>{tables}</ul>
        </div>
        <div>
          <h3>Views</h3>
          <ul>{views}</ul>
        </div>
      </aside>
    )
  }
}

export default Tables

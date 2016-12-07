import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

class Tables extends Component {
  constructor() {
    super()
    this.state = { tables: [], views: [] }
  }

  componentDidMount() {
    axios.get('/tables')
      .then(response => this.setState({ tables: response.data.tables, views: response.data.views }))
      .catch(err => browserHistory.push('/connect'))
  }

  render() {
    const tables = this.state.tables.map(table => {
      const tableLink = `/tables/${table}/structure`

      return (
        <li key={table}><a href={tableLink}>{table}</a></li>
      )
    })

    const views = this.state.views.map(view => {
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

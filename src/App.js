import React, { Component } from 'react'
import axios from 'axios'

import Tables from './Tables'

class App extends Component {
  constructor() {
    super()
    this.state = { tables: [] }
  }

  componentWillMount() {
    axios.get('http://127.0.1:8080/tables')
      .then(response => this.setState({ tables: response.data.tables }))
      .catch(err => console.error(err))
  }

  render() {
    const tables = this.state.tables.map(table => {
      return (
        <li key={table}>{table}</li>
      )
    })

    return (
      <div>
        <h1>PG-Pilot</h1>
        <h2>Tables</h2>
        <ul>{tables}</ul>
        <hr />
        {this.props.children}
      </div>
    )
  }
}

export default App

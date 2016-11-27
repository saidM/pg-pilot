import React, { Component } from 'react'
import axios from 'axios'

import Tables from './Tables'

class App extends Component {
  constructor() {
    super()
    this.state = { tables: [] }
  }

  componentWillMount() {
    axios.post('http://127.0.1:8080/login', { user: 'said', database: 'profacture_dev' })
      .then(data => this.setState({ tables: data.items }))
      .catch(err => console.error(err))
  }

  render() {
    const tables = this.state.tables.map(table => table.username)

    return (
      <div>
        <h1>PG-Pilot</h1>
        <hr />
        <h2>Tables</h2>
        {tables}
        <hr />
        {this.props.children}
      </div>
    )
  }
}

export default App

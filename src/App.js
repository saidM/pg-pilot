import React, { Component } from 'react'
import axios from 'axios'
import Tables from './Tables'

class App extends Component {
  constructor() {
    super()
    this.state = { tables: [] }
  }

  componentWillMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(data => this.setState({ tables: data.data }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <h1>PG-Pilot</h1>
        <Tables tables={this.state.tables} />
      </div>
    )
  }
}

export default App

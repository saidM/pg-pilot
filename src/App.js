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
    return (
      <div id="container">
        <Tables tables={this.state.tables} />
        {this.props.children}
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

import Header from './Header'
import Tables from './Tables'

class App extends Component {
  constructor() {
    super()
    this.state = { tables: [] }
  }

  componentWillMount() {
    axios.get('http://127.0.1:8080/tables')
      .then(response => this.setState({ tables: response.data.tables }))
      .catch(err => browserHistory.push('/connect'))
  }

  render() {
    // Don't render the header & the "Tables" if we are on the "Connect" page
    let header, tables;
    if (this.props.location.pathname != '/connect') header = <Header />
    if (this.props.location.pathname != '/connect') tables = <Tables tables={this.state.tables} />

    return (
      <div id="container">
        {header}
        {tables}
        {this.props.children}
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'

import Header from './Header'
import Tables from './Tables'

class App extends Component {
  render() {
    // Don't render the header & the "Tables" if we are on the "Connect" page
    let header, tables;
    if (this.props.location.pathname !== '/connect') header = <Header />
    if (this.props.location.pathname !== '/connect') tables = <Tables />

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

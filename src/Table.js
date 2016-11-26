import React, { Component } from 'react'

class Table extends Component {
  render() {
    return (
      <li>{this.props.table.username}</li>
    )
  }
}

export default Table

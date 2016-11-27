import React, { Component } from 'react'

class Table extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.params.tableName}</h2>
      </div>
    )
  }
}

export default Table

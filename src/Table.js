import React, { Component } from 'react'
import axios from 'axios'

class Table extends Component {
  constructor() {
    super()
    this.state = { fields: [], rows: [] }
  }

  componentWillMount() {
    axios.get(`http://127.0.1:8080/tables/${this.props.params.tableName}`)
      .then(response => this.setState({ fields: response.data.fields, rows: response.data.rows }))
      .catch(err => console.error(err))
  }

  render() {
    const fields = this.state.fields.map(field => {
      return (
        <th key={field.column_name}>{field.column_name}</th>
      )
    })

    const rows = this.state.rows.map((row, index) => {
      // For each row, loop through all the fields to get the value
      const values = this.state.fields.map(field => {
        return (
          <td>{row[field.column_name]}</td>
        )
      })

      return (
        <tr key={index}>{values}</tr>
      )
    })

    return (
      <div>
        <h2>{this.props.params.tableName}</h2>
        <table>
          <thead>
            <tr>{fields}</tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table

import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

class View extends Component {
  constructor() {
    super()
    this.state = { fields: [], rows: [] }
  }

  componentDidMount() {
    axios.get(`http://127.0.1:8080/tables/${this.props.params.viewName}`)
      .then(response => this.setState({ fields: response.data.fields, rows: response.data.rows }))
      .catch(err => console.error(err))
  }

  render() {
    let fields = this.state.fields.slice(0, 5).map(field => {
      return (
        <th key={field.column_name}>{field.column_name}</th>
      )
    })

    const rows = this.state.rows.map((row, index) => {
      // For each row, loop through all the fields to get the value
      const values = this.state.fields.slice(0, 5).map(field => {
        return (
          <td>{row[field.column_name]}</td>
        )
      })

      return (
        <tr key={index}>
          {values}
        </tr>
      )
    })

    return (
      <section>
        <h1>{this.props.params.viewName} View</h1>

        <div>
          <h2>Rows ({this.state.rows.length})</h2>
          <table>
            <thead>
              <tr>
                {fields}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default View

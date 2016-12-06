import React, { Component } from 'react'
import axios from 'axios'

class Query extends Component {
  constructor() {
    super()
    this.state = { fields: [], rows: [] }
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('http://127.0.1:8080/query', { sql: this.refs.sql.value })
      .then(response => {
        const fields = response.data.fields.map(field => field.name)
        this.setState({ fields: fields, rows: response.data.rows })
      })
      .catch(err => alert('Invalid query'))
  }

  render() {
    let fields = this.state.fields.map(field => {
      return (
        <th key={field}>{field}</th>
      )
    })

    const rows = this.state.rows.map((row, index) => {
      // For each row, loop through all the fields to get the value
      const values = this.state.fields.map(field => {
        return (
          <td>{row[field]}</td>
        )
      })

      return (
        <tr key={index}>{values}</tr>
      )
    })

    return (
      <section>
        <h1>SQL query</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2>Enter an SQL query</h2>
          <textarea ref="sql" placeholder="Enter SQL here.."></textarea>
          <input type="submit" value="Perform Query" />
        </form>

        <div>
          <h2>Query results</h2>
          <table>
            <thead>
              <tr>{fields}</tr>
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

export default Query

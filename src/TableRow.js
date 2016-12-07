import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

class TableRow extends Component {
  constructor() {
    super()
    this.state = { row: {} }
  }

  componentDidMount() {
    axios.get(`http://127.0.1:8080/tables/${this.props.params.tableName}/${this.props.params.id}`)
      .then(response => this.setState({ row: response.data }))
      .catch(err => alert('Row not found! Missing ID?'))
  }

  render() {
    let fields = []
    for (var property in this.state.row) {
      if (this.state.row.hasOwnProperty(property)) {
        fields.push(property)
      }
    }

    const values = fields.map((property, index) => {
      return (
        <tr key={index}>
          <td>{property}</td>
          <td>{this.state.row[property]}</td>
        </tr>
      )
    })

    return (
      <section>
        <h1>{this.props.params.tableName} Table</h1>

        <ul id="navigation">
          <li><Link to={"/tables/" + this.props.params.tableName + "/structure"}>Structure View</Link></li>
          <li className="active"><Link to={"/tables/" + this.props.params.tableName + "/rows"}>Data View</Link></li>
        </ul>

        <Link to={`/tables/${this.props.params.tableName}/rows`} href="#" id="go-back">Back to the data view</Link>

        <div>
          <h2>Row #{this.props.params.id}</h2>
          <table>
            <thead>
              <tr>
                <th>Column</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {values}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default TableRow

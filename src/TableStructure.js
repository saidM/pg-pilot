import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

class TableStructure extends Component {
  constructor() {
    super()
    this.state = { fields: [], indexes: [] }
  }

  componentDidMount() {
    axios.get(`http://127.0.1:8080/tables/${this.props.params.tableName}`)
      .then(response => this.setState({ fields: response.data.fields, indexes: response.data.indexes }))
      .catch(err => console.error(err))
  }

  render() {
    const fields = this.state.fields.map(field => {
      return (
        <tr key={field.column_name}>
          <td>{field.column_name}</td>
          <td>{field.column_default}</td>
          <td>{field.data_type}</td>
          <td>{field.is_nullable}</td>
        </tr>
      )
    })

    const indexes = this.state.indexes.map(index => {
      return (
        <tr key={index.indexname}>
          <td>{index.indexname}</td>
          <td>{index.indexdef}</td>
        </tr>
      )
    })

    return (
      <section>
        <h1>{this.props.params.tableName} Table</h1>

        <ul id="navigation">
          <li className="active"><Link to={"/tables/" + this.props.params.tableName + "/structure"}>Structure View</Link></li>
          <li><Link to={"/tables/" + this.props.params.tableName + "/rows"}>Data View</Link></li>
        </ul>

        <div>
          <h2>Structure</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Default</th>
                <th>Type</th>
                <th>Nullable</th>
              </tr>
            </thead>
            <tbody>
              {fields}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Indexes ({this.state.indexes.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              {indexes}
            </tbody>
          </table>
        </div>

      </section>
    )
  }
}

export default TableStructure

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './App'
import TableRows from './TableRows'
import TableStructure from './TableStructure'
import TableRow from './TableRow'
import View from './View'
import NoMatch from './NoMatch'
import Connect from './Connect'
import Query from './Query'
import Import from './Import'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="/connect" component={Connect} />
      <Route path="/tables/:tableName/structure" component={TableStructure} />
      <Route path="/tables/:tableName/rows" component={TableRows} />
      <Route path="/tables/:tableName/:id" component={TableRow} />
      <Route path="/views/:viewName" component={View} />
      <Route path="/query" component={Query} />
      <Route path="/import" component={Import} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Router>,
  document.getElementById('root')
);

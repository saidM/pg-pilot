import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './App'
import Table from './Table'
import NoMatch from './NoMatch'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/tables/:tableName" component={Table} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Router>,
  document.getElementById('root')
);

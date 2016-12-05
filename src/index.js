import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './App'
import Table from './Table'
import NoMatch from './NoMatch'
import Connect from './Connect'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="/connect" component={Connect} />
      <Route path="/tables/:tableName/structure" component={Table} />
      <Route path="/tables/:tableName/rows" component={Table} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Router>,
  document.getElementById('root')
);

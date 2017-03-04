import React from 'react'
import App from './App'
import SportPage from './SportPage'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'
import {Route, IndexRoute} from 'react-router'

module.exports = (

  <Route path="/" component={App}>
  // Give App route children
  <IndexRoute component={Home}></IndexRoute>
  <Route path="/repos" component={Repos}>
    <Route path="/repos/:userName/:repoName" component={Repo}/>
  </Route>
  <Route path="/football" component={SportPage}/>
  <Route path="/handball" component={SportPage}/>
  </Route>
)

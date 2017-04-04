import React from 'react'
import App from './App'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'
import CodingPage from './CodingPage'
import {Route, IndexRoute} from 'react-router'

module.exports = (

  <Route path="/" component={App}>
  // Give App route children
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/codingPage/:lesson" component={CodingPage}>
    </Route>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
  </Route>
)

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import ModApp from './ModApp'

module.exports = (
  <Route path="/">
    <Route path="*" component={ModApp}/>
  </Route>
)

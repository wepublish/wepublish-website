import React from 'react'
import {Route} from 'react-router'
import ModApp from './ModApp'

module.exports = (
  <Route path="/">
    <Route path="*" component={ModApp}/>
  </Route>
)

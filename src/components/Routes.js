import React from 'react'
import {Route, IndexRoute} from 'react-router'
import ModApp from './ModApp'

module.exports = (
    <Route path="/" component={ModApp}>
        <Route path="*" component={ModApp}/>
    </Route>
)

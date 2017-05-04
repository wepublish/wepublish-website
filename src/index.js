import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import Routes from './components/Router'

browserHistory.listen(function (location) {
  // Google Analytics basic implementation
  if (typeof ga !== 'undefined') {
    ga('set', 'page', location.pathname)
    ga('send', 'pageview')
  }
})

render(
  <Router routes={Routes} history={browserHistory}/>,
  document.getElementById('app-wrapper')
)
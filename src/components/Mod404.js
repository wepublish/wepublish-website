import React from 'react'

export default class Mod404 extends React.Component {

  render () {
    return (
      <div className="layout-article-404">
        <div className="block-header-error">
          <h6 className="block-header-subtitle">That’s an error</h6>
          <h1 className="block-header-title">404</h1>
        </div>
        <div className="block-title">
          <div className="block-title-triangle-error">
            <h2 className="typo-h3">Not found</h2>
            <p className="block-title-subtitle typo-h4">The requested URL was not found</p></div>
        </div>
      </div>
    )
  }
}

import React from 'react'

export default class ModBlockSpacer extends React.Component {

  render () {
    const {content} = this.props
    var divStyle = {
      height: content.value + 'px'
    }
    return (
        <div className="block-spacer bg-white" style={divStyle}></div>
    )
  }
}

ModBlockSpacer.propTypes = {
  content: React.PropTypes.shape({
    value: React.PropTypes.number.isRequired
  }).isRequired
}

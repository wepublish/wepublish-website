import React from 'react'

export default class ModBlockIFrame extends React.Component {

  render () {
    const {content} = this.props

    const createRichtTextMarkup = (content)=> {
      return {__html: content};
    }

    var aspectRatio = content.aspectRatio.split(":")
    var style = {
      paddingBottom: ((aspectRatio[1] / aspectRatio[0]) * 100) + '%'
    }

    return (
      <div className="block-iframe" style={style} dangerouslySetInnerHTML={createRichtTextMarkup(content.snippet)}/>
    )
  }
}

ModBlockIFrame.propTypes = {
  content: React.PropTypes.object
}

import React from 'react'

export default class ModBlockIFrame extends React.Component {

  render () {
    const {content} = this.props

    const createRichtTextMarkup = (content)=> {
      return {__html: content};
    }

    let aspectRatio = content.aspectRatio.split(":")
    let style = {
      paddingBottom: ((aspectRatio[1] / aspectRatio[0]) * 100) + '%'
    }

    return (
      <div className="block-iframe-wrapper">
        <div className="block-iframe" style={style} dangerouslySetInnerHTML={createRichtTextMarkup(content.snippet)}/>
      </div>
    )
  }
}

ModBlockIFrame.propTypes = {
  content: React.PropTypes.object
}

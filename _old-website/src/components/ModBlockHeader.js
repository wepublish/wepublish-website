import React from 'react'

export default class ModBlockHeader extends React.Component {

  render() {
    const {content} = this.props

    const createRichtTextMarkup = (content) => {
      return {__html: content};
    }

    let aspectRatio = content.aspectRatio.split(":")
    let style = {
      paddingBottom: ((aspectRatio[1] / aspectRatio[0]) * 100) + '%'
    }

    return (
      <div className="header-container">
        <div className="header-background">
          <div className="header-background block-iframe" style={style} dangerouslySetInnerHTML={createRichtTextMarkup(content.snippet)}/>
        </div>
      </div>
    )
  }
}

ModBlockHeader.propTypes = {
  content: React.PropTypes.object
};
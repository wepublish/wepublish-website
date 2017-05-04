import React from 'react'
import ModRichText from  './common/ModRichText'

export default class ModBlockRichText extends React.Component {

  render() {
    const {content} = this.props

    return (
      <div className="richText-wrapper">
        <div className="richText-title">
          <ModRichText richText={content.title}/>
        </div>

        <div className="richText-content">
          <div className="richText-block left">
            <ModRichText richText={content.textRight}/>
          </div>
          <div className="richText-block right">
            <ModRichText richText={content.textLeft}/>
          </div>
        </div>
      </div>
    )
  }
}

ModBlockRichText.propTypes = {
  content: React.PropTypes.object
};

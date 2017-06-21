import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from "./common/ModImgTag";

export default class ModBlockHeader extends React.Component {

  render() {
    const {content} = this.props

    return (
      <div className="header-background" style={{backgroundImage: 'url(' + content.backgroundImage.url + ')'}}
           alt={content.backgroundImage.altText}>

        <div className="header-wrapper">
          <ModImgTag imgObject={content.logo} width={55} height={55} alt={content.logo.altText}/>
          <div className="header-content">
            <ModRichText richText={content.title}/>
          </div>
          <div className="header-border-bottom"></div>
        </div>
      </div>
    )
  }
}

ModBlockHeader.propTypes = {
  content: React.PropTypes.object
};
import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from "./common/ModImgTag";

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


          <div className="header-background block-iframe" style={style}
               dangerouslySetInnerHTML={createRichtTextMarkup(content.snippet)}/>


          {/*<div className="header-wrapper">*/}
          {/*<ModImgTag imgObject={content.logo} width={55} height={55} alt={content.logo.altText}/>*/}
          {/*<div className="header-content">*/}
          {/*<ModRichText richText={content.title}/>*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
}

ModBlockHeader.propTypes = {
  content: React.PropTypes.object
};
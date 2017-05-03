import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from './common/ModImgTag'
import ModAnchorTag from "./common/ModAnchorTag";

export default class ModBlockTeaserSpot extends React.Component {

  render() {
    const {content} = this.props

    const teaserSpot = content.list.map((item, index) => {
      return (
        <div key={index} className="teaserSpot-content">
          <div className="teaserSpot-img">
            <ModAnchorTag linkObject={item.imageLink}>
              <ModImgTag imgObject={item.image} width={166} height={166} alt={item.image.altText}/>
            </ModAnchorTag>
          </div>

          <div className="teaserSpot-text">
            <ModRichText richText={item.textBlock}/>
          </div>

          <div className="teaserSpot-border-bottom"></div>
        </div>
      )
    });

    return (
      <div className="teaserSpot-wrapper">
        {teaserSpot}
      </div>
    )
  }
}

ModBlockTeaserSpot.propTypes = {
  content: React.PropTypes.object
}


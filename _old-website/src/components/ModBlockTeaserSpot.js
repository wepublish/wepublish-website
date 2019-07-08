import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from './common/ModImgTag'
import ModAnchorTag from "./common/ModAnchorTag";
import {backgroundColorSwitch} from '../common/DDUtil'

export default class ModBlockTeaserSpot extends React.Component {

  render() {
    const {content} = this.props

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)

    const teaserSpot = content.list.map((item, index) => {
      return (
        <div key={index} className="teaserSpot-content">
          <div className="teaserSpot-img">
            <ModAnchorTag linkObject={item.imageLink}>
              <ModImgTag imgObject={item.image} width={279} height={279}/>
            </ModAnchorTag>
          </div>
          <div className="teaserSpot-text">
            <ModRichText richText={item.textBlock}/>
          </div>
        </div>
      )
    });

    return (
      <div className={backgroundColor}>
        <div className="teaserSpot-wrapper">
          {teaserSpot}
        </div>
      </div>
    )
  }
}

ModBlockTeaserSpot.propTypes = {
  content: React.PropTypes.object
}


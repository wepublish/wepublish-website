import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from './common/ModImgTag'
import ModAnchorTag from "./common/ModAnchorTag";

export default class ModBlockTeaserSpot extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    const teaserSpot = content.list.map((item, index) => {
      return (
        <div key={index} className="content">
          <ModAnchorTag linkObject={item.imageLink}>
            <ModImgTag imgObject={item.image}/>
          </ModAnchorTag>
          <ModRichText richText={item.textBlock}/>
        </div>
      )
    });

    return (
      <div className="richText-wrapper">
        {teaserSpot}
      </div>
    )
  }
}


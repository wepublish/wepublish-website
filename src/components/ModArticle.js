import React from 'react'
import ModBlockHeader from './ModBlockHeader'
import ModBlockRichText from './ModBlockRichText'
import ModBlockTitle from "./ModBlockTitle";
import ModBlockTeaserSpot from "./ModBlockTeaserSpot";
import ModBlockImageSlider from "./ModBlockImageSlider";
import ModBlockImage from "./ModBlockImage";
import ModBlockSpacer from "./ModBlockSpacer";


export default class ModArticle extends React.Component {

  render () {
    const {article, config} = this.props

    let html = article.blocks.map(function (item, index) {
      switch (item.type) {
        case config.contentTypeBlockHeader:
          return <ModBlockHeader key={index}
                                 content={item.content}/>
        case config.contentTypeBlockRichText:
          return <ModBlockRichText key={index}
                                 content={item.content}/>
        case config.contentTypeBlockTitle:
          return <ModBlockTitle key={index}
                                   content={item.content}/>
        case config.contentTypeBlockSpacer:
          return <ModBlockSpacer key={index} content={item.content}/>
        case config.contentTypeBlockTeaserSpot:
          return <ModBlockTeaserSpot key={index}
                                   content={item.content}/>
        case config.contentTypeBlockImageSlider:
          if (item.content.list.length === 1) {
            // If there is just one item in the list, display an simple Image Block
            return <ModBlockImage key={index} content={{image: item.content.list[0].image}}/>
          }
          return <ModBlockImageSlider key={index} content={item.content} index={index}/>
        default:
          return null
      }
    })

    return (
      <div className="layout-article">
        {html}
      </div>
    )
  }
}

ModArticle.propTypes = {
  article: React.PropTypes.object,
  config: React.PropTypes.object
}
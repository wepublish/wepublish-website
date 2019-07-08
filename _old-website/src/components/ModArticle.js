import React from 'react'
import ModBlockHeader from './ModBlockHeader'
import ModBlockTwoColumnGrid from './ModBlockTwoColumnGrid'
import ModBlockTitle from "./ModBlockTitle";
import ModBlockTeaserSpot from "./ModBlockTeaserSpot";
import ModBlockImageSlider from "./ModBlockImageSlider";
import ModBlockImage from "./ModBlockImage";
import ModBlockSpacer from "./ModBlockSpacer";
import ModBlockiFrame from "./ModBlockiFrame";
import ModBlockDownload from "./ModBlockDownload";
import ModBlockRichTextTab from "./ModBockRichTextTab";
import ModBlockContact from "./ModBlockContact";


export default class ModArticle extends React.Component {

  render() {
    const {article, config} = this.props

    let html = article.blocks.map(function (item, index) {
      switch (item.type) {
        case config.contentTypeBlockHeader:
          return <ModBlockHeader key={index}
                                 content={item.content}/>
        case config.contentTypeBlockRichTextTab:
          return <ModBlockRichTextTab key={index}
                                      content={item.content}/>
        case config.contentTypeBlockTwoColGrid:
          return <ModBlockTwoColumnGrid key={index}
                                        content={item.content}/>
        case config.contentTypeBlockTitle:
          return <ModBlockTitle key={index}
                                content={item.content}/>
        case config.contentTypeBlockContact:
          return <ModBlockContact key={index}
                                content={item.content}/>
        case config.contentTypeBlockSpacer:
          return <ModBlockSpacer key={index} content={item.content}/>
        case config.contentTypeBlockTeaserSpot:
          return <ModBlockTeaserSpot key={index}
                                     content={item.content}/>
        case config.contentTypeBlockImageSlider:
          if (item.content.list.length === 1) {
            return <ModBlockImage key={index} content={{image: item.content.list[0].image}}/>
          }
          return <ModBlockImageSlider key={index} content={item.content} index={index}/>
        case config.contentTypeBlockIFrame:
          return <ModBlockiFrame key={index} content={item.content}/>
        case config.contentTypeBlockDownload:
          return <ModBlockDownload key={index}
                                     content={item.content}/>
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
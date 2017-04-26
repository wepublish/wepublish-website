import React from 'react'
import ModBlockHeader from './ModBlockHeader'
import ModBlockRichText from './ModBlockRichText'
import ModBlockTitle from "./ModBlockTitle";
import ModBlockTeaserSpot from "./ModBlockTeaserSpot";
import ModBlockImageSlider from "./ModBlockImageSlider";
import ModBlockImage from "./ModBlockImage";


export default class ModArticle extends React.Component {

  render () {
    const {article, config, openModalViewHandler, currentLanguage, pathname, caasHelper, navigationNodeId, navigationTree} = this.props

    let html = article.blocks.map(function (item, index) {
      switch (item.type) {
        case config.contentTypeBlockHeader:
          return <ModBlockHeader key={index}
                                 content={item.content}
                                 blocks={article.blocks}
                                 config={config}
                                 pathname={pathname}
                                 currentLanguage={currentLanguage}
                                 navigationTree={navigationTree}/>
        case config.contentTypeBlockRichText:
          return <ModBlockRichText key={index}
                                 content={item.content}/>
        case config.contentTypeBlockTitle:
          return <ModBlockTitle key={index}
                                   content={item.content}/>
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
  config: React.PropTypes.object,
  openModalViewHandler: React.PropTypes.func,
  currentLanguage: React.PropTypes.string.isRequired,
  pathname: React.PropTypes.string.isRequired,
  caasHelper: React.PropTypes.object.isRequired,
  navigationNodeId: React.PropTypes.string.isRequired,
  navigationTree: React.PropTypes.object.isRequired
}
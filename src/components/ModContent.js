import React from 'react'
import ModArticle from './ModArticle'
import Mod404 from './Mod404'
import {removeClassFromElement} from '../common/DDUtil'

export default class ModContent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      openNodeId: null
    }
    this.closeNavigation = this.closeNavigation.bind(this)

  }

  closeNavigation (e) {
    if(this.props.naviOpen === true) {
      this.props.onNavToggle(false)
    }
  }

  render() {
    const {content, config, caasHelper, navigationTree, openModalViewHandler, currentLanguage, pathname} = this.props

    let contentHtml = <Mod404 />

    if (content && content.article) {
      if (content.article.type == config.contentTypeArticle) {
        contentHtml =
          <ModArticle article={content.article}
                      config={config}
                      openModalViewHandler={openModalViewHandler}
                      currentLanguage={currentLanguage}
                      pathname={pathname}
                      caasHelper={caasHelper}
                      navigationNodeId={content.navigationNodeId}
                      navigationTree={navigationTree}
          />
      }
    }

    return (
      <div id="content" onClick={this.closeNavigation}>
        {contentHtml}
      </div>
    )
  }
}

ModContent.propTypes = {
  config: React.PropTypes.object,
  content: React.PropTypes.object,
  caasHelper: React.PropTypes.object,
  navigationTree: React.PropTypes.object,
  openModalViewHandler: React.PropTypes.func,
  currentLanguage: React.PropTypes.string.isRequired,
  pathname: React.PropTypes.string.isRequired
}
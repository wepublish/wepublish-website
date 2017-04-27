import React from 'react'
import NavLink from './common/NavLink'
import ModRichText from  '../components/common/ModRichText'
import ModAnchorTag from  '../components/common/ModAnchorTag'
import ModImgTag from  '../components/common/ModImgTag'
import {hasContent, addClassToElement, removeClassFromElement, removeLanguageNavigationNode} from '../common/DDUtil'


export default class ModFooter extends React.Component {

  createMetaNodes(nodes) {
    if (!(nodes instanceof Array)) {
      return null
    }
    let item
    let key

    for (key in nodes) {
      if (nodes.hasOwnProperty(key)) {
        item = nodes[key]
        if (item.slug === "meta") {
          break
        }
      }
    }

    let metaNodes = null
    if (item) {
      metaNodes = item.children.map((item, index) => {
        return (
          <li key={index}>
            <NavLink to={item.relativeUrl} onClick={this.closeNavigation}>{item.label}</NavLink>
          </li>
        )
      })
    }

    return <ul className="navigation-meta-links">{metaNodes}</ul>
  }

  createLanguageNodes(nodes, currentLanguage) {
    if (!(nodes instanceof Array)) {
      return null
    }

    let languageNodes = nodes.map((item, index) => {
      const languageNodesLength = nodes.map.length;

      const navLang = <NavLink className={"navigation-lag " + (currentLanguage == item.slug ? 'active' : '')} to={item.relativeUrl + "/microservices"} onClick={this.closeNavigation}>{item.label}</NavLink>

      return index == 0 ? (<li key={index}>{navLang}</li>) : (<li key={index}>/ {navLang}</li>)

    })

    return <ul className="languages-footer">{languageNodes}</ul>
  }


  render() {
    const {navigationTree, splat} = this.props
    const {content, currentLanguage} = this.props
    if (!(navigationTree && navigationTree.children && hasContent(currentLanguage))) {
      return null
    }
    const navigationTreeWithoutLang = removeLanguageNavigationNode(navigationTree.children, currentLanguage)
    const langNavigation = this.createLanguageNodes(navigationTree.children, currentLanguage)
    const metaNavigation = navigationTreeWithoutLang ? this.createMetaNodes(navigationTreeWithoutLang.children) : null


    return (
      <footer id="footer" style={{backgroundImage: 'url(' + content.backgroundImage.url + ')'}}>
        <div className="footer-wrapper">
          <div className="footer-left">
            <ModRichText richText={content.text}/>

            <div className="footer-border-bottom"></div>

            {langNavigation}
          </div>

          <div className="footer-right">
            <ModAnchorTag linkObject={content.logoLink}>
              <ModImgTag imgObject={content.logo} width={168}/>
            </ModAnchorTag>
          </div>
        </div>
      </footer>
    )
  }
}

ModFooter.propTypes = {
  content: React.PropTypes.object
}

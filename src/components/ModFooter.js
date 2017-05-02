import React from 'react'
import NavLink from './common/NavLink'
import ModRichText from  '../components/common/ModRichText'
import ModAnchorTag from  '../components/common/ModAnchorTag'
import ModImgTag from  '../components/common/ModImgTag'
import {hasContent} from '../common/DDUtil'


export default class ModFooter extends React.Component {

  createLanguageNodes(nodes, currentLanguage) {
    if (!(nodes instanceof Array)) {
      return null
    }

    let languageNodes = nodes.map((item, index) => {
      const navLang = <NavLink className={"navigation-lag " + (currentLanguage === item.slug ? 'active' : '')} to={item.relativeUrl + "/microservices"} onClick={this.closeNavigation}>{item.label}</NavLink>

      return index === 0 ? (<li key={index}>{navLang}</li>) : (<li key={index}>/ {navLang}</li>)

    })

    return <ul className="languages-footer">{languageNodes}</ul>
  }


  render() {
    const {navigationTree} = this.props
    const {content, currentLanguage} = this.props
    if (!(navigationTree && navigationTree.children && hasContent(currentLanguage))) {
      return null
    }
    const langNavigation = this.createLanguageNodes(navigationTree.children, currentLanguage)

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

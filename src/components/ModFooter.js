import React from 'react'
import NavLink from './common/NavLink'
import ModImgTag from  '../components/common/ModImgTag'
import {hasContent} from '../common/DDUtil'


export default class ModFooter extends React.Component {

  createLanguageNodes(nodes, currentLanguage) {
    if (!(nodes instanceof Array)) {
      return null
    }

    let languageNodes = nodes.map((item, index) => {
      const navLang = <NavLink className={"navigation-lag " + (currentLanguage === item.slug ? 'active' : '')}
                               to={item.relativeUrl + "/home"}
                               onClick={this.closeNavigation}>{item.label}</NavLink>

      return index === 0 ? (<li key={index}>{navLang}</li>) : (<li key={index}>/ {navLang}</li>)

    })

    return <ul className="languages-footer">{languageNodes}</ul>
  }

  backToTop() {
    window.scrollTo(0, 0);
  }


  render() {
    const {navigationTree} = this.props
    const {content, currentLanguage} = this.props
    if (!(navigationTree && navigationTree.children && hasContent(currentLanguage))) {
      return null
    }

    const langNavigation = this.createLanguageNodes(navigationTree.children, currentLanguage)

    return (
      <footer id="footer">
        <div className="footer-wrapper">
          <div className="footer-left">
            {/*{langNavigation}*/}
            <h3>{content.textLeft}</h3>
          </div>

          <div className="footer-center">
            <h3>{content.textCenter}</h3>
          </div>

          <div className="footer-right" onClick={this.backToTop}>
            <h3>{content.textRight}</h3>
            <ModImgTag className="footer-img" imgObject={content.image}/>
          </div>
        </div>
      </footer>
    )
  }
}

ModFooter.propTypes = {
  content: React.PropTypes.object
}

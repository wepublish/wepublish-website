import React from 'react'
import NavLink from './common/NavLink'
import {hasContent, removeLanguageNavigationNode} from '../common/DDUtil'
import {isNodeVisible} from '../caas/CaasHelper'


export default class ModNavigation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      openNodeId: null
    }

    this.toggleNavigation = this.toggleNavigation.bind(this)
    this.closeNavigation = this.closeNavigation.bind(this)
    this.createNavigationNode = this.createNavigationNode.bind(this)
    this.createLanguageNodes = this.createLanguageNodes.bind(this)
  }

  setStateBy(replaceObjects) {
    this.setState(
      Object.assign({}, this.state, replaceObjects)
    )
  }

  toggleNavigation(e) {
    this.setStateBy({
      openNodeId: null
    })
    this.props.onNavToggle(!this.props.naviOpen)
  }

  closeNavigation(e) {
    this.props.onNavToggle(false)
  }

  createNavigationNode(nodes) {
    if (!(nodes instanceof Array) || nodes.length < 1) {
      return null
    }

    let navigationNode = nodes.reduce((prevItem, item, index) => {
      if (isNodeVisible(item)) {
        prevItem.push(
          (
            <li key={index} className={'navigation-item-container'}>
              <NavLink className='navigation-top' to={item.relativeUrl} onClick={this.closeNavigation}>
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        )
      }
      return prevItem
    }, [])

    return <ul className={"navigation-nodes"}>{navigationNode}</ul>
  }

  createLanguageNodes(nodes, currentLanguage) {
    if (!(nodes instanceof Array)) {
      return null
    }

    let languageNodes = nodes.map((item, index) => {
      const navLang = <NavLink className={"navigation-lag " + (currentLanguage === item.slug ? 'active' : '')} to={item.relativeUrl + "/microservices"} onClick={this.closeNavigation}>{item.label}</NavLink>

      return index == 0 ? (<li key={index}>{navLang}</li>) : (<li key={index}>/ {navLang}</li>)

    })

    return <ul className="navigation-languages">{languageNodes}</ul>
  }


  render() {
    const {navigationTree, currentLanguage} = this.props
    if (!(navigationTree && navigationTree.children && hasContent(currentLanguage))) {
      return null
    }

    const navigationTreeWithoutLang = removeLanguageNavigationNode(navigationTree.children, currentLanguage)
    const langNavigation = this.createLanguageNodes(navigationTree.children, currentLanguage)


    return (
      <div id="navigation-wrappter" className="">

        <a id="navigation-burger" className="navigation-burger">
          <div className="navigation-burger-wrapper">
            <div className="menu-content-wrapper">
              <div id="navigation-text" href="/">
                <p id="scroll-text-small">We Are.&nbsp;</p>
                <p id="scroll-text-big"> DU DA.</p>
              </div>

            </div>
            <div className="navigation-icon" onClick={this.toggleNavigation}>
              <img className="navigation-icon-open" src={require("../static/fonts/iconfont/svg/naviBurger.png")}/>
            </div>
          </div>
        </a>

        <div id="navigation" className={this.props.naviOpen ? "is-expanded" : ""}>
          <div className="navigation-header">
            <NavLink to={currentLanguage} onClick={this.closeNavigation}>
            </NavLink>
          </div>
          <div className="navigation-wrapper">
            <div className="navigation-content">
              <div className="closeNavigation" onClick={this.closeNavigation}>
                <img className="navigation-icon-close" src={require("../static/fonts/iconfont/svg/naviBurgerClose.png")}/>
              </div>
              <div className="navigation-main">
                <div className="navigation-title">
                  <div className="naviOpen-text">
                    <p id="naviOpen-text-small">We Are.&nbsp;</p>
                    <p id="naviOpen-text-big"> DU DA.</p>
                  </div>
                  <div className="navi-border-bottom"></div>
                </div>
                {this.createNavigationNode(navigationTreeWithoutLang.children, true)}
                <div className="navigation-meta">
                  {langNavigation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ModNavigation
  .propTypes = {
  currentLanguage: React.PropTypes.string.isRequired,
  navigationTree: React.PropTypes.object.isRequired
}

import React from 'react'
import NavLink from './common/NavLink'
import {hasContent, addClassToElement, removeClassFromElement, removeLanguageNavigationNode} from '../common/DDUtil'
import {isNodeVisible} from '../caas/CaasHelper'
import ModRichText from  'components/common/ModRichText'
import ModAnchorTag from  'components/common/ModAnchorTag'
import ModImgTag from  'components/common/ModImgTag'


export default class ModNavigation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      openNodeId: null
    }

    this.toggleSubNav = this.toggleSubNav.bind(this)
    this.toggleNavigation = this.toggleNavigation.bind(this)
    this.closeNavigation = this.closeNavigation.bind(this)
    this.createNavigationNode = this.createNavigationNode.bind(this)
    this.createLanguageNodes = this.createLanguageNodes.bind(this)
    this.createMetaNodes = this.createMetaNodes.bind(this)
  }

  setStateBy(replaceObjects) {
    this.setState(
      Object.assign({}, this.state, replaceObjects)
    )

    // Set App Class if menu is open
    // TODO check if this is kosher
    // if (replaceObjects.naviOpen != undefined) {
    //   let app = window.document.getElementById("app")
    //   if (replaceObjects.naviOpen) {
    //     addClassToElement(app, "navigation-open")
    //   }
    //   else {
    //     removeClassFromElement(app, "navigation-open")
    //   }
    // }
  }

  toggleSubNav(e) {
    const navButton = e.currentTarget;
    if (navButton) {
      let id = navButton.dataset.id;
      if (id === this.state.openNodeId) {
        id = null;
      }

      this.setStateBy({
        openNodeId: id
      })
    }
  }

  toggleNavigation(e) {
    this.setStateBy({
      openNodeId: null
    })
    this.props.onNavToggle(!this.props.naviOpen)
  }

  closeNavigation(e) {
    // if (this.props.naviOpen === true) {
    //   this.setStateBy({
    //     naviOpen: false
    //   })
    // }
    this.props.onNavToggle(false)
  }

  hasActiveChild(item, splat) {
    if (item && splat) {
      const slugs = splat.split("/");
      if (slugs.length > 1 && slugs[1] == item.slug) {
        for (let i = 0; i < item.children.length; i++) {
          if (item.children[i].slug == slugs[2]) {
            return true
          }
        }
      }
    }
    return false;
  }


  createNavigationNode(nodes, isTopNav, splat) {
    if (!(nodes instanceof Array) || nodes.length < 1) {
      return null
    }

    let initialOpenNodeFound = splat && splat.split("/").length > 1

    let d = nodes.reduce((prevItem, item, index) => {
      if (isNodeVisible(item)) {

        const active_child = this.hasActiveChild(item, splat)
        let open_node = this.state.openNodeId == item.id
        if (open_node == false && active_child && !this.state.openNodeId) {
          open_node = true;
        }

        if (item.children.length != 0) {
          if (!this.state.openNodeId && !initialOpenNodeFound) {
            initialOpenNodeFound = true
            open_node = true
          }

          prevItem.push(
            isTopNav ?
              (
                <li key={index}
                    className={open_node ? 'navigation-item-container is-open' : 'navigation-item-container'}>
                  <div className='navigation-top navigation-subnavigation' onClick={this.toggleSubNav}
                       data-id={item.id}>
                    <span data-id={item.id}>{ item.label }</span>
                  </div>
                  {this.createNavigationNode(item.children, false, null)}
                </li>
              ) : (
              <li key={index}>
                <NavLink className='icon icon-nav_arrow' to={item.relativeUrl} onClick={this.closeNavigation}>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          )
        }
        else {
          prevItem.push(
            isTopNav ?
              (
                <li key={index} className={'navigation-item-container'}>
                  <NavLink className='navigation-top' to={item.relativeUrl} onClick={this.closeNavigation}>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ) : (
              <li key={index}>
                <NavLink className='icon icon-nav_arrow' to={item.relativeUrl} onClick={this.closeNavigation}>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          )
        }
      }
      return prevItem
    }, [])

    return <ul className={isTopNav ? 'navigation-nodes' : 'navigation-sub-nodes'}>{d}</ul>
  }

  createLanguageNodes(nodes, currentLanguage) {
    if (!(nodes instanceof Array)) {
      return null
    }

    let languageNodes = nodes.map((item, index) => {
      const languageNodesLength = nodes.map.length;

      const navLang = <NavLink className={"navigation-lag " + (currentLanguage == item.slug ? 'active' : '')} to={item.relativeUrl + "/home"} onClick={this.closeNavigation}>{item.label}</NavLink>

      return index == 0 ? (<li key={index}>{navLang}</li>) : (<li key={index}>/ {navLang}</li>)

    })

    const itemleft = "{"
    const itemright = "}"

    return <ul className="navigation-languages">{itemleft} {languageNodes} {itemright}</ul>
  }


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

  render() {
    const {navigationTree, currentLanguage, splat} = this.props
    if (!(navigationTree && navigationTree.children && hasContent(currentLanguage))) {
      return null
    }

    const {content} = this.props
    const {footer} = this.props

    const navigationTreeWithoutLang = removeLanguageNavigationNode(navigationTree.children, currentLanguage)
    const langNavigation = this.createLanguageNodes(navigationTree.children, currentLanguage)
    const metaNavigation = navigationTreeWithoutLang ? this.createMetaNodes(navigationTreeWithoutLang.children) : null


    return (
      //<div id="navigation-wrappter" className="menu-hidden">
      <div id="navigation-wrappter" className="">

        <a id="navigation-burger" className="navigation-burger" onClick={this.toggleNavigation}>
          <div className="navigation-burger-wrapper">
            <div className="menu-content-wrapper">
              <div id="navigation-text">We Are. <strong> DU DA.</strong></div>
            </div>
            <div className="navigation-icon icon icon-naviBurger"></div>
          </div>
        </a>

        <div id="navigation" className={this.props.naviOpen ? "is-expanded" : ""}>
          <div className="navigation-header">


            <NavLink to={currentLanguage} onClick={this.closeNavigation}>
            </NavLink>
          </div>
          <div className="navigation-wrapper">
            <div className="navigation-content">
              <div className="navigation-main">
                <div className="navigation-logo-wrapper">
                  {/*<a href="/"><img className="navigation-logo" src={require("static/img/navlogo.svg")}/></a>*/}
                </div>
                {this.createNavigationNode(navigationTreeWithoutLang.children, true, splat)}


                <div className="navigation-meta desktop">
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

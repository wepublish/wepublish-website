import React from 'react'
import ModNavigation from './ModNavigation'
import ModContent from './ModContent'
import ModFooter from './ModFooter'
import CaasHelper from '../caas/CaasHelper'
import {searchNavigationNodeByUrl} from '../caas/CaasHelper'
import VoConfig from '../vo/VoConfig'
import {createMetaFields} from '../common/MetaFields'
import {getCurrentLanguageOrFallBackByPath, addClassToElement, removeClassFromElement} from '../common/DDUtil'


if (WEBPACK_FRONTEND_BUILD) {
  require("../static/fonts/iconfont/Iconfont.font.js");
  require("../static/scss/index.scss")
}

export default class ModApp extends React.Component {

  constructor(props) {
    super(props)

    this.caasHelper = new CaasHelper()
    this.lastKnownScrollPosition = 0

    if (typeof window !== 'undefined') {
      if (window.APP_PROPS) {
        this.state = {...window.APP_PROPS, naviOpen: false}
        this.caasHelper.injectConfig(Object.assign(new VoConfig(), this.state.config))
      }
    }
    else if (this.props.params.appState) {
      this.state = this.props.params.appState
    }
    else {
      this.state = {
        config: null,
        navigationTree: null,
        footer: null,
        content: null,
        naviOpen: false
      }
    }

    this.setStateBy = this.setStateBy.bind(this)
    this.setHeadMetaInformation = this.setHeadMetaInformation.bind(this)
    this.fetchFooter = this.fetchFooter.bind(this)
    this.onGotoHome = this.onGotoHome.bind(this)
    this.hasUpdatedLocation = this.hasUpdatedLocation.bind(this)
    this.onNavToggle = this.onNavToggle.bind(this)
  }

  setHeadMetaInformation() {
    const metaFields = createMetaFields(this.state.content)
    document.title = metaFields.title
  }

  async fetchFooter(nextLanguage) {
    let footer = await this.caasHelper.fetchFooter(this.state.navigationTree, nextLanguage)
    this.setStateBy({footer: footer})
  }

  setStateBy(replaceObjects) {
    this.setState(
      Object.assign({}, this.state, replaceObjects)
    )
  }

  onGotoHome() {
    this.props.history.goBack()
  }

  hasUpdatedLocation(lastProps, nextProps) {
    try {
      if (lastProps.location.pathname !== nextProps.location.pathname) {
        return true
      }
    } catch (e) {
    }
    return false
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.hasUpdatedLocation(this.props, nextProps)) {
      let nextLanguage = getCurrentLanguageOrFallBackByPath(nextProps.params.splat)
      let currentLanguage = getCurrentLanguageOrFallBackByPath(this.props.params.splat)

      if (nextLanguage !== currentLanguage) {
        this.fetchFooter(nextLanguage)
      }

      let foundNodeId = searchNavigationNodeByUrl(this.state.navigationTree.children, nextProps.params.splat)
      this.caasHelper.fetchContentByNavigationNodeId(this.state.navigationTree, foundNodeId, (content) => {
        this.setStateBy({content: content})
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.setHeadMetaInformation()
    if (this.hasUpdatedLocation(prevProps, this.props)) {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    }
  }

  componentDidMount() {
    if (!this.state) {
      this.caasHelper.fetchAll(this.props.params.splat, (result) => {
        this.setStateBy(result)
      })
    }

    if (typeof window !== 'undefined') {
      // window.addEventListener('scroll', function (e) {
      //   let scrollPositionY = window.pageYOffset || document.documentElement.scrollTop
      //   let app = window.document.getElementById("navigation-burger")
      //   let naviText = window.document.getElementById("navigation-text")
      //
      //
      //   if (this.lastKnownScrollPosition < scrollPositionY || scrollPositionY < 44) {
      //     if (scrollPositionY > 100) {
      //       addClassToElement(app, "menu-content")
      //       addClassToElement(naviText, "menu-content")
      //     }
      //     else {
      //       removeClassFromElement(app, "menu-content")
      //       removeClassFromElement(naviText, "menu-content")
      //     }
      //   }
      //
      //   this.lastKnownScrollPosition = scrollPositionY
      // })
    }
  }

  onNavToggle(isNaviOpen) {
    this.setState({
        naviOpen: isNaviOpen
      }
    )
  }

  render() {
    let currentLanguage = getCurrentLanguageOrFallBackByPath(this.props.location.pathname)

    if (!this.state) {
      return (
        <div id="app">
          <p className="loading">loading</p>
        </div>
      )
    }

    return (
      <div id="app">
        <ModNavigation navigationTree={this.state.navigationTree}
                       currentLanguage={currentLanguage}
                       naviOpen={this.state.naviOpen}
                       onNavToggle={this.onNavToggle}/>
        <ModContent config={this.state.config}
                    content={this.state.content}
                    naviOpen={this.state.naviOpen}
                    onNavToggle={this.onNavToggle}
        />
        <ModFooter content={this.state.footer} currentLanguage={currentLanguage} splat={this.props.params.splat} navigationTree={this.state.navigationTree}
        />
      </div>
    )
  }
}


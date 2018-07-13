import React from 'react'
// import ModNavigation from './ModNavigation'
// import ModContent from './ModContent'
// import ModFooter from './ModFooter'
import WebsiteDe from './WebsiteDe'
import WebsiteFr from './WebsiteFr'
import CaasHelper from '../caas/CaasHelper'
// import { searchNavigationNodeByUrl } from '../caas/CaasHelper'
import VoConfig from '../vo/VoConfig'
import { createMetaFields } from '../common/MetaFields'
import { getCurrentLanguageOrFallBackByPath, addClassToElement, removeClassFromElement, backgroundColorSwitch, lineColorSwitch } from '../common/DDUtil'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import NavLink from './common/NavLink'


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
        this.state = { ...window.APP_PROPS, naviOpen: false }
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

    // this.setStateBy = this.setStateBy.bind(this)
    // this.setHeadMetaInformation = this.setHeadMetaInformation.bind(this)
    // this.fetchFooter = this.fetchFooter.bind(this)
    // this.onGotoHome = this.onGotoHome.bind(this)
    // this.hasUpdatedLocation = this.hasUpdatedLocation.bind(this)
    // this.onNavToggle = this.onNavToggle.bind(this)
    this.backToTop = this.backToTop.bind(this)
  }

  // setHeadMetaInformation() {
  //   const metaFields = createMetaFields(this.state.content)
  //   document.title = metaFields.title
  // }

  // async fetchFooter(nextLanguage) {
  //   let footer = await this.caasHelper.fetchFooter(this.state.navigationTree, nextLanguage)
  //   this.setStateBy({ footer: footer })
  // }

  // setStateBy(replaceObjects) {
  //   this.setState(
  //     Object.assign({}, this.state, replaceObjects)
  //   )
  // }

  // onGotoHome() {
  //   this.props.history.goBack()
  // }

  backToTop() {
    window.scrollTo(0, 0);
  }

  // hasUpdatedLocation(lastProps, nextProps) {
  //   try {
  //     if (lastProps.location.pathname !== nextProps.location.pathname) {
  //       return true
  //     }
  //   } catch (e) {
  //   }
  //   return false
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   if (this.hasUpdatedLocation(this.props, nextProps)) {
  //     let nextLanguage = getCurrentLanguageOrFallBackByPath(nextProps.params.splat)
  //     let currentLanguage = getCurrentLanguageOrFallBackByPath(this.props.params.splat)

  //     if (nextLanguage !== currentLanguage) {
  //       this.fetchFooter(nextLanguage)
  //     }

  //     let foundNodeId = searchNavigationNodeByUrl(this.state.navigationTree.children, nextProps.params.splat)
  //     this.caasHelper.fetchContentByNavigationNodeId(this.state.navigationTree, foundNodeId, (content) => {
  //       this.setStateBy({ content: content })
  //     })
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setHeadMetaInformation()
  //   if (this.hasUpdatedLocation(prevProps, this.props)) {
  //     if (typeof window !== 'undefined') {
  //       window.scrollTo(0, 0)
  //     }
  //   }
  // }

  // componentDidMount() {
  //   if (!this.state) {
  //     this.caasHelper.fetchAll(this.props.params.splat, (result) => {
  //       this.setStateBy(result)
  //     })
  //   }
  // }

  // onNavToggle(isNaviOpen) {
  //   this.setState({
  //     naviOpen: isNaviOpen
  //   }
  //   )
  // }

  render() {

    console.log(this.props.location.pathname)

    let currentLanguage = getCurrentLanguageOrFallBackByPath(this.props.location.pathname)

    // if (!this.state) {
    //   return (
    //     <div id="app">
    //       <p className="loading">loading</p>
    //     </div>
    //   )
    // }

    let html = null  
    if(currentLanguage == 'fr') {
      html = (
        <WebsiteFr />
      )
    }else{
      html = (
        <WebsiteDe />
      )
    }

    return (
      <div id="app">
        {html}
      </div>
    )
  }
}


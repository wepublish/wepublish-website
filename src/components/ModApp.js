import React from 'react'
import WebsiteDe from './WebsiteDe'
import WebsiteFr from './WebsiteFr'
import { getCurrentLanguageOrFallBackByPath } from '../common/DDUtil'


if (WEBPACK_FRONTEND_BUILD) {
  require("../static/fonts/iconfont/Iconfont.font.js");
  require("../static/scss/index.scss")
}

export default class ModApp extends React.Component {

  constructor(props) {
    super(props)

    this.backToTop = this.backToTop.bind(this)
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

  render() {

    console.log(this.props.location.pathname)

    let currentLanguage = getCurrentLanguageOrFallBackByPath(this.props.location.pathname)


    console.log(currentLanguage)

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
      <div>
        {html}
      </div>
    )
  }
}


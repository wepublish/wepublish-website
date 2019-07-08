import React from 'react'
import {backgroundColorSwitch, lineColorSwitch} from '../common/DDUtil'


export default class ModBlockSpacer extends React.Component {

  render() {
    const {content} = this.props

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)
    let lineColor = lineColorSwitch(content.lineColor)

    let divStyle = {
      height: content.value + 'px'
    }

    let divStyleMobile = {
      height: content.valueMobile + 'px'
    }

    return (
      <div className={backgroundColor}>
        <div className="block-spacer spacer-desktop">
          <div className={lineColor} style={divStyle}></div>
        </div>

        <div className="block-spacer spacer-mobile" style={divStyleMobile}>
          <div id="spacer-line-mobile" className={lineColor} style={divStyleMobile}></div>
        </div>
      </div>
    )
  }
}

ModBlockSpacer.propTypes = {
  content: React.PropTypes.shape({
    value: React.PropTypes.number.isRequired
  }).isRequired
}

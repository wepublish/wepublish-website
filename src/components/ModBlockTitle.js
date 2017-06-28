import React from 'react'
import ModRichText from  './common/ModRichText'
import {backgroundColorSwitch} from '../common/DDUtil'

export default class ModBlockTitle extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)

    let title = (
      <div className="title">
        <ModRichText richText={content.title}/>
      </div>
    )

    let subtitle = (
      <div className="subtitle">
        <ModRichText richText={content.subtitle}/>
      </div>
    )

    return (
      <div className={backgroundColor}>
        <div className="title-wrapper">
          {title}
          {subtitle}
        </div>
      </div>
    )
  }
}

ModBlockTitle.propTypes = {
  content: React.PropTypes.object
}
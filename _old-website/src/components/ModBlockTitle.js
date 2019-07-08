import React from 'react'
import ModRichText from  './common/ModRichText'
import {backgroundColorSwitch} from '../common/DDUtil'
import {hasRichTextContent} from '../common/DDUtil'

export default class ModBlockTitle extends React.Component {

  render() {
    const {content} = this.props

    let title = null;
    let subtitle = null;
    let backgroundColor = backgroundColorSwitch(content.backgroundColor)

    if (hasRichTextContent(content.title)) {
      title = (
        <div className="title">
          <ModRichText richText={content.title}/>
        </div>
      )
    }

    if (hasRichTextContent(content.subtitle)) {
      subtitle = (
        <div className="subtitle">
          <ModRichText richText={content.subtitle}/>
        </div>
      )
    }

    return (
      <div className={backgroundColor}>
        <div className="title-wrapper">
          <a id={content.anchorName.toLowerCase()} className="anchor-padding"></a>
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
import React from 'react'
import ModRichText from  './common/ModRichText'

export default class ModBlockTitle extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    return (
      <div className="title-wrapper">
        <div className="icon icon-titleArrow"></div>
        <div className="title">
          <ModRichText richText={content.title}/>
        </div>

        <div className="title-border-bottom"></div>

        <div className="subtitle">
          <ModRichText richText={content.subtitle}/>
        </div>
      </div>
    )
  }
}
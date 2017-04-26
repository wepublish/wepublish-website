import React from 'react'
import ModRichText from  './common/ModRichText'

export default class ModBlockTitle extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    return (
      <div className="title-wrapper">
        <ModRichText richText={content.title}/>
        <ModRichText richText={content.subtitle}/>
      </div>
    )
  }
}
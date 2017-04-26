import React from 'react'
import ModRichText from  './common/ModRichText'

export default class ModBlockRichText extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    return (
      <div className="richText-wrapper">
        <ModRichText richText={content.title}/>
        <ModRichText richText={content.textRight}/>
        <ModRichText richText={content.textLeft}/>
      </div>
    )
  }
}


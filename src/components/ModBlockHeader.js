import React from 'react'
import ModRichText from  './common/ModRichText'

export default class ModBlockHeader extends React.Component {

  render() {
    const {content} = this.props

    console.log(content)

    return (
      <div className="header-background" style={{backgroundImage: 'url(' + content.backgroundImage.url + ')'}}>
        <div className="header-content">
          <ModRichText richText={content.title}/>
        </div>
      </div>
    )
  }
}


import React from 'react'
import {createReactComponents} from 'common/DraftJsToReact'
import {convertFromRaw} from 'draft-js'

export default class ModRichText extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {richText} = this.props
    return createReactComponents(convertFromRaw(richText))
  }
}

ModRichText.propTypes = {
  richText: React.PropTypes.object
}

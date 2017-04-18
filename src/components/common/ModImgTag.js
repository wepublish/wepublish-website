import React from 'react'
import {addCloudinaryParamsToUrl} from 'common/DDUtil'

export default class ModImgTag extends React.Component {

  render () {
    const {imgObject, alt} = this.props

    if (!imgObject) {
      return <img src="broken.png"/>
    }

    let url = imgObject.url

    if (/jpe?g|png|gif/.test(imgObject.format)) {
      let cloudinaryParams = ['q_60']
      let addTransformation = false
      if (this.props.width) {
        addTransformation = true
        cloudinaryParams.push('w_' + this.props.width)
      }
      if (this.props.height) {
        addTransformation = true
        cloudinaryParams.push('h_' + this.props.height)
      }

      if (addTransformation) {
        cloudinaryParams.push(this.props.transformation || 'c_fill')
      }
      url = addCloudinaryParamsToUrl(imgObject.url, cloudinaryParams)
    }

    return <img src={url} alt={alt} className={this.props.className ? this.props.className : ""}/>
  }
}

ModImgTag.propTypes = {
  imgObject: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }).isRequired,
  alt: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  className: React.PropTypes.string,
  transformation: React.PropTypes.string
}

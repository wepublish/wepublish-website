import React from 'react'
import ModImgTag from '../components/common/ModImgTag'

export default class ModBlockImage extends React.Component {

  render() {

    const {content} = this.props

    return (
      <div className="block-image">
        <ModImgTag imgObject={content.image} alt={content.image.altText}/>
      </div>
    )
  }
}

ModBlockImage.propTypes = {
  content: React.PropTypes.object
};

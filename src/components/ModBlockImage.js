import React from 'react'
import ModImgTag from '../components/common/ModImgTag'

export default class ModBlockImage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showMe: false
    }

    this.showFullSizeImg = this.showFullSizeImg.bind(this)
  }

  showFullSizeImg(e) {
    this.setState({showMe: !this.state.showMe})
  }

  render() {

    const {content} = this.props


    let imageContent

    if (this.state.showMe) {
      imageContent =
        <div className="fullsize">
          <ModImgTag imgObject={content.image}/>
        </div>
    } else {
      imageContent =
        <ModImgTag imgObject={content.image} width={687} height={416}/>
    }

    return (
      <div className="block-image" onClick={this.showFullSizeImg}>
        {imageContent}
      </div>
    )
  }
}

ModBlockImage.propTypes = {
  content: React.PropTypes.object
};

import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from './common/ModImgTag'
import ModAnchorTag from "./common/ModAnchorTag";
import {backgroundColorSwitch} from '../common/DDUtil'


export default class ModBlockContact extends React.Component {

  render() {
    const {content} = this.props

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)

    return (
      <div className={backgroundColor}>
        <div className="contact-wrapper">
          <div className="contact-img-content">
            <ModAnchorTag linkObject={content.imageLink}>
              <div className="contact-img-wrapper">
                <img className="contact-arrow" src={require("../static/img/arrow-right.png")}/>
                <ModImgTag className="contact-img" imgObject={content.image}/>
              </div>
            </ModAnchorTag>
          </div>
          <div className="contact-text">
            <ModRichText richText={content.textBlock}/>
          </div>
        </div>
      </div>
    )
  }
}
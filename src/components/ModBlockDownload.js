import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from './common/ModImgTag'
import ModAnchorTag from "./common/ModAnchorTag";
import {backgroundColorSwitch, lineColorSwitch} from '../common/DDUtil'


export default class ModBlockDownload extends React.Component {

  render() {
    const {content} = this.props

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)
    let lineColor = lineColorSwitch(content.lineColor)

    return (
      <div className={backgroundColor}>
        <div className="download-wrapper">

          <div className="download-content">
            <div className="download-img-container">
              <ModAnchorTag linkObject={content.imageLinkLeft}>
                <div className="download-img-wrapper">
                  <img className="download-arrow" src={require("../static/img/arrow_down.png")}/>
                  <div className="download-img-div">
                    <ModImgTag className="download-img" imgObject={content.imageLeft}/>
                  </div>
                </div>
              </ModAnchorTag>
            </div>
            <div className="download-text">
              <ModAnchorTag linkObject={content.imageLinkLeft}>
                <ModRichText richText={content.textLeft}/>
              </ModAnchorTag>
            </div>
          </div>

          <div className={lineColor}></div>

          <div className="download-content">
            <div className="download-img-container">
              <ModAnchorTag linkObject={content.imageLinkRight}>
                <div className="download-img-wrapper">
                  <img className="download-arrow" src={require("../static/img/arrow_down.png")}/>
                  <div className="download-img-div">
                    <ModImgTag className="download-img" imgObject={content.imageRight}/>
                  </div>
                </div>
              </ModAnchorTag>
            </div>
            <div className="download-text">
              <ModAnchorTag linkObject={content.imageLinkLeft}>
                <ModRichText richText={content.textRight}/>
              </ModAnchorTag>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

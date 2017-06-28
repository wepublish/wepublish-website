import React from 'react'
import ModRichText from  './common/ModRichText'
import ModImgTag from "./common/ModImgTag";
import {backgroundColorSwitch, lineColorSwitch} from '../common/DDUtil'

export default class ModBlockTwoColumnGrid extends React.Component {

  render() {
    const {content} = this.props

    let backgroundColor = backgroundColorSwitch(content.backgroundColor)
    let lineColor = lineColorSwitch(content.lineColor)

    return (
      <div className={backgroundColor}>

        <div className="richText-wrapper">
          <div className="richText-content">
            <div id="padding-line-top" className={lineColor}></div>
          </div>
        </div>


        <div className="richText-wrapper">
          <div className="richText-content">
            <div className="richText-block">
              <ModImgTag imgObject={content.imageLeft}/>
              <ModRichText richText={content.textLeft}/>
            </div>

            <div className={lineColor}></div>

            <div className="richText-block">
              <ModImgTag imgObject={content.imageRight}/>
              <ModRichText richText={content.textRight}/>
            </div>
          </div>
        </div>

        <div className="richText-wrapper">
          <div className="richText-content">
            <div id="padding-line-bottom" className={lineColor}></div>
          </div>
        </div>
      </div>
    )
  }
}

ModBlockTwoColumnGrid.propTypes = {
  content: React.PropTypes.object
};

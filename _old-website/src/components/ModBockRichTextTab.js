import React from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import ModRichText from "./common/ModRichText";
import {backgroundColorSwitch} from '../common/DDUtil'


export default class ModBlockRichTextTab extends React.Component {

  render() {
    const {content} = this.props
    let backgroundColor = backgroundColorSwitch(content.backgroundColor)

    const richTextTabTitle = content.list.map((item, index) => {
      return (
        <Tab key={index}>{item.title}</Tab>
      )
    });

    const richTextTabText = content.list.map((item, index) => {
      return (
        <TabPanel key={index}>
          <ModRichText richText={item.text}/>
        </TabPanel>
      )
    });

    return (
      <div className={backgroundColor}>
        <div className="richTextTab-wrapper">
          <Tabs>
            <TabList>
              <h2>{richTextTabTitle}</h2>
            </TabList>
            {richTextTabText}
          </Tabs>
        </div>
      </div>
    )
  }
}

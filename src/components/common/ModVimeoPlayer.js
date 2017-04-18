import React from 'react'
import ReactDOM from 'react-dom'
import {hasContent} from 'common/DDUtil'

export default class ModVimeoPlayer extends React.Component {

  constructor (props) {
    super(props)

    this.vimeoPlayer = typeof Vimeo !== 'undefined'
    this.iFrame = null
    this.initVimeo = this.initVimeo.bind(this)
    this.onPlay = this.onPlay.bind(this)

    this.state = {
      "isPlaying": !this.vimeoPlayer
    }
  }

  componentDidMount () {
    this.initVimeo()
  }


  initVimeo () {
    // https://github.com/vimeo/player.js
    const iFrameNode = ReactDOM.findDOMNode(this.iFrame)
    if (iFrameNode && this.vimeoPlayer) {
      let player = new Vimeo.Player(iFrameNode)
      player.on('play', this.onPlay)
    }
  }

  onPlay () {
    setTimeout(() => {
      this.setState({
        "isPlaying": true
      })
    }, 500)
  }

  render () {
    const regexp = /^[a-z\\-]+:\/\/vimeo.com\/([0-9]+)/
    let match = regexp.exec(this.props.vimeoUrl)
    const videoId = hasContent(match) ? match[1] : 0
    const param = this.props.isBackgroundVideo ? "?background=1" : "" // autoplay=1&loop=1&
    return (
      <div className="vimeo-player">
        <iframe className={this.state.isPlaying ? "is-playing" : ""}
                ref={(ref) => this.iFrame = ref}
                src={"https://player.vimeo.com/video/" + videoId + param}
                frameBorder="0">
        </iframe>
      </div>
    )
  }
}

ModVimeoPlayer.propTypes = {
  vimeoUrl: React.PropTypes.string
}

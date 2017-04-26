import React from 'react'
import ModImgTag from '../components/common/ModImgTag'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from '../../node_modules/photoswipe/dist/photoswipe-ui-default'
import ModIdangerousSwiper from '../components/common/ModIdangerousSwiper'
import {hasContent, addCloudinaryParamsToUrl} from '../common/DDUtil'

const MAX_IMG_SIZE = 2000

export default class ModBlockImageSlider extends React.Component {

  constructor (props) {
    super(props)


    this.state = {
      fullScreen: false,
      sliderIndex: 0
    }

    this.photoSwipeFullscreen = null
    this.initFullScreenSwiperComponents = this.initFullScreenSwiperComponents.bind(this)
    this.destroyFullScreenSwiperComponents = this.destroyFullScreenSwiperComponents.bind(this)

    this.getFullscreenSliderId = this.getFullscreenSliderId.bind(this)
    this.onClickProductImage = this.onClickProductImage.bind(this)
  }

  onClickProductImage (event) {
    this.setState({
      fullScreen: true,
      sliderIndex: event.currentTarget.getAttribute('data-index')
    })
  }

  getFullscreenSliderId () {
    return 'fullscreen-slider-' + this.props.index
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.fullScreen) {
      this.initFullScreenSwiperComponents(this.state.sliderIndex)
    }
  }

  //******************************************************************************************************************
  // Fullscreen Slider
  //******************************************************************************************************************

  initFullScreenSwiperComponents (index = 0) {
    this.destroyFullScreenSwiperComponents()

    if (this.props.content) {

      const items = this.props.content.list.map(function (item, index) {
        let w = MAX_IMG_SIZE / item.image.width
        let h = MAX_IMG_SIZE / item.image.height
        let zoomFactor = Math.min(Math.min(w, h), 1)

        return {
          src: addCloudinaryParamsToUrl(item.image.url, ['w_' + MAX_IMG_SIZE, 'h_' + MAX_IMG_SIZE, 'c_limit']),
          w: item.image.width * zoomFactor,
          h: item.image.height * zoomFactor,
          title: item.text
        }
      })

      var pswpElement = document.getElementById(this.getFullscreenSliderId())

      var options = {
        index: Math.min(index, items.length - 1),
        history: false,
        focus: false,
        shareEl: false,
        loop: false,
        getThumbBoundsFn: function (index) {
          var rect = {x: 0, y: 0, w: 0}
          var templateBounds = pswpElement.parentElement.getBoundingClientRect()
          rect.x -= templateBounds.left
          rect.y -= templateBounds.top
          return rect
        }
      }

      this.photoSwipeFullscreen = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
      this.photoSwipeFullscreen.listen('updateScrollOffset', function (_offset) {
        var r = pswpElement.getBoundingClientRect()
        _offset.x += r.left;
        _offset.y += r.top;
      })
      this.photoSwipeFullscreen.listen('close', () => {
        this.destroyFullScreenSwiperComponents()
        this.setState({
          fullScreen: false,
          sliderIndex: 0
        })
      })
      this.photoSwipeFullscreen.init()
    }
  }

  destroyFullScreenSwiperComponents () {
    if (this.photoSwipeFullscreen) {
      try {
        this.photoSwipeFullscreen.destroy()
      } catch (e) {
      }
      this.photoSwipeFullscreen = null
    }
  }


  //******************************************************************************************************************
  // React
  //******************************************************************************************************************

  render () {

    if (!hasContent(this.props.content.list)) {
      return null
    }

    let inlineSlider = this.props.content.list.map((item, index)=> {
      return (
        <div className="swiper-slide" key={index} data-index={index} onClick={this.onClickProductImage}>
          <div className="block-slider-img-container">
            <ModImgTag imgObject={item.image} width={1920} transformation="c_limit"/>
          </div>
          <div className="caption">
            <p className="typo-h7 l-centered-content">{item.text}</p>
          </div>
        </div>)
    })

    const fullScreenSlider = this.state.fullScreen ? (
      <div id={this.getFullscreenSliderId()} className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"></div>
              <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
              <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
              <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>
            <div className="pswp__ icon icon-but_sliderArrow left"></div>
            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <div className="pswp__ icon icon-but_sliderArrow right"></div>
            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    ) : null

    return (
      <div className="block-slider parent bg-white">
        <div className="block-slider-text-bg"></div>
        <ModIdangerousSwiper id={this.props.content.id}
                             hasNavigation={true}
                             navigationIcon="icon-but_sliderArrow"
                             hasPagination={true}
                             maxPaginationCount={10}
                             hasFullScreen={true}
                             fullScreenIcon="icon-but_double_arrow"
                             hasSlideNumber={true}>
          {inlineSlider}
        </ModIdangerousSwiper>
        {fullScreenSlider}
      </div>
    )
  }
}

ModBlockImageSlider.propTypes = {
  content: React.PropTypes.object,
  index: React.PropTypes.number
}

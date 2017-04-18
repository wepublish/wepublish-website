import React, {Component, PropTypes}  from 'react'

export default class ModIdangerousSwiper extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      "activeSlide": 1
    }

    this.swiper = null
    this.destroySwiperComponents = this.destroySwiperComponents.bind(this)
    this.createSwiperComponents = this.createSwiperComponents.bind(this)
    this.onSliderSlide = this.onSliderSlide.bind(this)
  }

  componentWillUnmount () {
    this.destroySwiperComponents()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.children.length !== prevProps.children.length || !this.swiper) {
      this.createSwiperComponents()
    }
  }

  componentDidMount () {
    this.createSwiperComponents()
  }

  createSwiperComponents () {
    this.destroySwiperComponents()

    let params = {spaceBetween: 10}
    if(this.props.options){
      params = Object.assign(params, this.props.options)
    }
    if (this.props.hasNavigation) {
      params['nextButton'] = '#' + this.props.id + '  .swiper-button-next'
      params['prevButton'] = '#' + this.props.id + ' .swiper-button-prev'
    }

    if (this.props.hasPagination) {
      params['pagination'] = '#' + this.props.id + ' .swiper-pagination'
      params['paginationClickable'] = true
    }


    this.swiper = new Swiper('#' + this.props.id, params)

    this.swiper.on('onSlideChangeStart', () => {
      this.onSliderSlide(true)
    })
    this.swiper.on('onSliderMove', () => {
      this.onSliderSlide(true)
    })
    this.swiper.on('onSlideChangeEnd', () => {
      this.onSliderSlide(false)
    })
  }

  onSliderSlide (activity) {

    if (this.state.activeSlide != (this.swiper.activeIndex + 1) && !activity) {
      this.setState({
        "activeSlide": (this.swiper.activeIndex + 1)
      })
    }
    if (this.props.onSlide) {
      this.props.onSlide(activity, this.swiper.activeIndex)
    }
  }

  destroySwiperComponents () {
    if (this.swiper) {
      this.swiper.off('onSlideChangeStart')
      this.swiper.off('onSliderMove')
      this.swiper.off('onSlideChangeEnd')
      this.swiper.destroy()
    }
  }

  addLeadingZeros (number, maxNumber) {
    let digit_count = maxNumber.toString().length
    if (digit_count < 2) digit_count = 2;

    let s = number.toString();
    while (s.length < (digit_count)) {
      s = "0" + s
    }
    return s
  }


  render () {
    const {children, hasNavigation, navigationIcon, hasFullScreen, fullScreenIcon, hasPagination, maxPaginationCount, hasSlideNumber, id} = this.props

    return (
      <div className="swiper-container" id={id}>
        <div className="swiper-wrapper">
          {children}
        </div>
        { hasFullScreen ? <div
          className={"swiper-button-fullscreen" + (fullScreenIcon ? " icon " + fullScreenIcon : "")}></div> : "" }
        { hasNavigation ?
          <div>
            {/*<div className={"swiper-button-next" + (navigationIcon ? " icon " + navigationIcon : "")}></div>*/}
            {/*<div*/}
              {/*className={"swiper-button-prev"  + (navigationIcon ? " icon " + navigationIcon : "")}></div>*/}
          </div> : "" }
        { (hasPagination && children.length < maxPaginationCount) ? <div className="swiper-pagination"></div> : "" }
        { hasSlideNumber ?
          <div
            className="swiper-slide-number">{this.addLeadingZeros(this.state.activeSlide, children.length)}/{this.addLeadingZeros(children.length, children.length)}</div> : "" }
      </div>
    )
  }
}

ModIdangerousSwiper.propTypes = {
  id: React.PropTypes.string,
  children: React.PropTypes.array.isRequired,
  onSlide: React.PropTypes.func,
  hasNavigation: React.PropTypes.bool,
  navigationIcon: React.PropTypes.string,
  hasPagination: React.PropTypes.bool,
  maxPaginationCount: React.PropTypes.number,
  hasFullScreen: React.PropTypes.bool,
  fullScreenIcon: React.PropTypes.string,
  hasSlideNumber: React.PropTypes.bool,
  options: React.PropTypes.object
}

ModIdangerousSwiper.getDefaultProps = {
  maxPagination: Number.MAX_SAFE_INTEGER
}


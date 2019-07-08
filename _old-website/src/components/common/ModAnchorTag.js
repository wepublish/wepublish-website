import React from 'react'
import NavLink from 'components/common/NavLink'

const IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "tif", "tiff", "svg"]

export default class ModAnchorTag extends React.Component {

  static getLinkIconType (linkObject, hasIcon) {
    if (!(hasIcon && linkObject)) return ""

    let iconType = " icon "
    if (linkObject.hasOwnProperty("url")) {
      if (linkObject.url === "") {
        return ""
      }
      if (linkObject.url.startsWith("mailto:")) {
        iconType += "icon-but_mail"
      }
      iconType += "icon-but_link_external_filled"
    }
    else if (linkObject.hasOwnProperty("navigationNode")) {
      iconType += "icon-but_link_filled"
    }
    else if (linkObject.hasOwnProperty("document")) {
      if (IMAGE_TYPES.indexOf(linkObject.document.type) > -1) {
        iconType += "icon-but_link_img"
      } else {
        iconType += "icon-but_link_doc"
      }
    }
    else {
      iconType = ""
    }
    return iconType
  }


  static wrapSpan (children) {
    if (typeof children === "string" || children instanceof Array) {
      return <span>{children}</span>
    }
    return children
  }


  render () {
    let children = ModAnchorTag.wrapSpan(this.props.children)

    if (!(this.props.linkObject && typeof this.props.linkObject === "object")) {
      return children
    }

    const {linkObject, hasIcon} = this.props

    try {
      if (linkObject.hasOwnProperty("url")) {
        if (linkObject.url === "") {
          return children
        }
        if (linkObject.url.startsWith("mailto:")) {
          return <a className={"a-mail" + ModAnchorTag.getLinkIconType(linkObject, hasIcon)}
                    href={linkObject.url}>{children}</a>
        }
        return <a className={"a-external" + ModAnchorTag.getLinkIconType(linkObject, hasIcon)}
                  href={linkObject.url} target="_blank">{children}</a>
      }
      else if (linkObject.hasOwnProperty("navigationNode")) {
        return <NavLink className={"a-internal" + ModAnchorTag.getLinkIconType(linkObject, hasIcon)}
                        to={linkObject.navigationNode.relativeUrl}>{children}</NavLink>
      }
      else if (linkObject.hasOwnProperty("document")) {
        return <a className={"a-" + linkObject.document.type + ModAnchorTag.getLinkIconType(linkObject, hasIcon)}
                  href={linkObject.document.url} target="_blank">{children}</a>
      }
    }
    catch (e) {
      console.warn(e)
    }

    return children
  }
}

ModAnchorTag.propTypes = {
  linkObject: React.PropTypes.shape({
    url: React.PropTypes.string,
    navigationNode: React.PropTypes.shape({
      relativeUrl: React.PropTypes.string.isRequired
    }),
    document: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired
    })
  })
}

import React from 'react'
import {searchNavigationNodeById} from '../caas/CaasHelper'


/**
 *
 * @param property
 * @returns {boolean}
 */
export function hasContent(property) {
  if (typeof property == "string") {
    return property !== ""
  }

  if (property instanceof Array) {
    return property.length > 0
  }

  return false
}

/**
 *
 * @param element
 * @param className
 */
export function addClassToElement(element, className) {
  if (element.classList)
    element.classList.add(className)
  else
    element.className += ' ' + className
}

/**
 *
 * @param element
 * @param className
 */
export function removeClassFromElement(element, className) {
  if (element.classList)
    element.classList.remove(className)
  else
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}

/**
 * removes slashes at the beginning and end of a string
 * @param value
 * @returns {string}
 */
export function stripSlashes(value) {
  if (typeof value !== 'string')return value
  return value.replace(/^\//, '').replace(/\/$/, '')
}

/**
 * Get language code by path
 * @param path
 */
export function getCurrentLanguageByPath(path) {
  var regexp = /^\/{0,1}(de|en)/i
  var match = regexp.exec(path)
  if (!hasContent(match)) {
    return "unknown"
  }
  return match[1]
}

/**
 * Fall Back Language is en
 * @param path
 */
export function getCurrentLanguageOrFallBackByPath(path) {
  let currentLanguage = getCurrentLanguageByPath(path)
  return currentLanguage === "unknown" ? "en" : currentLanguage
}

/**
 * If media is a mediaId string this function searches the media object in the mediaPool and returns this object.
 * otherwise the function just returns the media param
 * @param mediaPool
 * @param media might be an mediaId string or a media object
 * @returns {*}
 */
export function getMediaObjectById(mediaPool, media) {
  if (typeof media === 'string' && mediaPool && mediaPool.hasOwnProperty(media)) {
    return mediaPool[media]
  }
  return media
}

/**
 * If the linkObject contains a navigationNode or document id string,
 * this function searches the media or navigation object in the mediaPool/navigationTree and returns this object.
 * otherwise the function just returns the linkObject param
 * @param navigationTree
 * @param mediaPool
 * @param linkObject
 * @returns {null}
 */
export function addLinkObject(navigationTree, mediaPool, linkObject) {
  if (linkObject) {
    if (linkObject.hasOwnProperty("navigationNode") && typeof linkObject.navigationNode === 'string') {
      linkObject.navigationNode = searchNavigationNodeById(navigationTree.children, linkObject.navigationNode) || linkObject.navigationNode
    }
    else if (linkObject.hasOwnProperty("document") && typeof linkObject.document === 'string') {
      linkObject.document = getMediaObjectById(mediaPool, linkObject.document)
    }
  }
  return linkObject
}

/**
 *
 * @param navigationTree
 * @param mediaPool
 * @param richText
 * @returns {*}
 */
export function addLinkObjectToRichText(navigationTree, mediaPool, richText) {
  for (let key in richText.entityMap) {
    if (richText.entityMap.hasOwnProperty(key)) {
      let entity = richText.entityMap[key]
      if (entity.type === "LINK") {
        entity.data = addLinkObject(navigationTree, mediaPool, entity.data)
      }
    }
  }
  return richText
}

/**
 *
 * @param date
 */
export function dateFormat(date) {

  function leftPad(n) {
    if (n < 10) {
      return "0" + n
    }
    return n
  }

  return leftPad(date.getDate()) + "." + leftPad(date.getMonth() + 1) + "." + date.getFullYear()
}

/**
 *
 * @param array
 * @returns {*}
 */
export function shuffleArray(array) {
  let counter = array.length

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

/**
 *
 * @param url
 * @param cloudinaryParams
 * @returns {string|void|XML|*}
 */
export function addCloudinaryParamsToUrl(url, cloudinaryParams) {
  return url.replace(/\/(v\d+)/, '/' + cloudinaryParams.join(','))
}


/**
 *
 * @param nodes
 * @param currentLanguage
 * @returns {*}
 */
export function removeLanguageNavigationNode(nodes, currentLanguage) {
  if (!(nodes instanceof Array)) {
    return null
  }
  for (var key in nodes) {
    if (nodes.hasOwnProperty(key)) {
      let node = nodes[key]
      if (node.slug === currentLanguage) {
        return node
      }
    }
  }
}

export function hasRichTextContent(richText) {
  return !(richText.blocks.length == 1 && !hasContent(richText.blocks[0].text))
}
import fetch from 'isomorphic-fetch'
import VoContentType from '../vo/VoContentType'
import VoConfig from '../vo/VoConfig'
import {hasContent, getMediaObjectById, addLinkObject, addLinkObjectToRichText} from '../common/DDUtil'
import {getCurrentLanguageOrFallBackByPath, stripSlashes} from '../common/DDUtil'
import config from '../config'
import docCookies from 'mozilla-doc-cookies'
import {log} from '../common/Log'

// Config
let voConfig = null
let endpoint = config.caasEndpoint
let db = config.caasDb
let user = config.user
let pwd = config.pwd

function getUrl () {
  return endpoint
}

/**
 *
 * @constructor
 */
export default function SaasHelper () {

  /**
   *
   * @param path
   * @param callback
   */
  this.fetchAll = async function (path, callback) {
    voConfig = new VoConfig()

    if (typeof window !== "undefined") {
      let session = docCookies.getItem('session')
      if (session && session.database === db) {
        voConfig.userSession = JSON.parse(session)
      }
    }

    if (!voConfig.userSession) {
      voConfig.userSession = await signIn(user, pwd, db)
    }

    if (typeof window !== "undefined") {
      docCookies.setItem('session', JSON.stringify(voConfig.userSession), Infinity, "/")
    }

    const props = {
      config: null,
      navigationTree: null,
      footer: null,
      content: null,
      modalView: null
    }
    await fetchModelTypes(voConfig)
    voConfig.rootNavigationEntityId = await fetchRootCategoryNode(voConfig)
    props.config = voConfig


    // Fetch Navigation Tree
    let navigationTree = await this.fetchNavigation()
    if (!navigationTree) {
      callback(props)
      return
    }
    props.navigationTree = navigationTree

    // Fetch Footer
    let lang = getCurrentLanguageOrFallBackByPath(path)
    props.footer = await this.fetchFooter(navigationTree, lang)


    // Fetch Content
    let foundNodeId = searchNavigationNodeByUrl(navigationTree.children, path)
    if (foundNodeId) {
      this.fetchContentByNavigationNodeId(navigationTree, foundNodeId, (content) => {
        props.content = content
        callback(props)
      })
    }
    else {
      callback(props)
    }
  }


  /**
   *
   * @param path
   * @param cache
   * @param callback
   */
  this.setCached = async function (path, cache, callback) {
    const props = cache
    props.config = Object.assign(new VoConfig(), cache.config)
    voConfig = props.config

    // Fetch Footer
    let lang = getCurrentLanguageOrFallBackByPath(path)
    props.footer = await this.fetchFooter(props.navigationTree, lang)

    // Fetch Content
    let foundNodeId = searchNavigationNodeByUrl(props.navigationTree.children, path)
    if (foundNodeId) {
      this.fetchContentByNavigationNodeId(props.navigationTree, foundNodeId, (content) => {
        props.content = content
        callback(props)
      })
    }
    else {
      callback(props)
    }
  }


  this.injectConfig = function (config) {
    voConfig = config
  }


  /**
   * fetch the whole navigation tree
   */
  this.fetchNavigation = async function () {
    const query = [
      `${voConfig.contentTypeNavigationNodes}->${voConfig.contentTypeNavigationNodes}`,
      `${voConfig.contentTypeNavigationNodes}<-${voConfig.contentTypeArticle}`
    ]
    const url = getUrl() + "/" + voConfig.contentTypeNavigationNodes + "/" + voConfig.rootNavigationEntityId + "?flow=" + encodeURIComponent(JSON.stringify(query))

    log("CaasHelper.fetchNavigation: " + url)
    return await fetch(url, getFetchOptions(voConfig))
      .then(status)
      .then(json)
      .then(response)
      .then(function (result) {
        log(JSON.stringify(result))
        return parseCategories(result)
      })
      .catch(function (ex) {
        console.error('CaasHelper.fetchNavigation failed', ex)
      })
  }

  function parseCategories (result) {
    const nodePool = result[voConfig.contentTypeNavigationNodes]
    const articlePool = result[voConfig.contentTypeArticle]
    return createNodes(nodePool, articlePool, [voConfig.rootNavigationEntityId], "")[0] || [];
  }


  /**
   * fetch footer
   * @param navigationTree
   * @param lang
   */
  this.fetchFooter = async function (navigationTree, lang) {
    let footerNavigationNodeId = searchNavigationNodeByUrl(navigationTree.children, lang + "/footer")
    const query = [
      `${voConfig.contentTypeNavigationNodes}<-${voConfig.contentTypeFooter}`,
      `${voConfig.contentTypeFooter}->${voConfig.contentTypeMedia}`
    ]
    const url = getUrl() + "/" + voConfig.contentTypeNavigationNodes + "/" + footerNavigationNodeId + "?flow=" + encodeURIComponent(JSON.stringify(query))
    log("CaasHelper.fetchFooter: " + url)
    return await fetch(url, getFetchOptions(voConfig))
      .then(status)
      .then(json)
      .then(response)
      .then(function (footerResult) {
        return parseFooter(navigationTree, footerResult)
      })
      .catch(function (ex) {
        console.error('CaasHelper.fetchFooter failed', ex)
      })
  }

  /**
   *
   * @param navigationTree
   * @param result
   * @returns {null}
   */
  function parseFooter (navigationTree, result) {
    if (result &&
      result.hasOwnProperty(voConfig.contentTypeMedia) &&
      result.hasOwnProperty(voConfig.contentTypeFooter)
    ) {
      const mediaPool = parseMedia(result)
      const footerPool = result[voConfig.contentTypeFooter]

      for (let footerId in footerPool) {
        if (footerPool.hasOwnProperty(footerId)) {
          let footer = footerPool[footerId]


          footer.backgroundImage = getMediaObjectById(mediaPool, footer.backgroundImage)
          footer.text = addLinkObjectToRichText(navigationTree, mediaPool, footer.text)
          footer.logo = getMediaObjectById(mediaPool, footer.logo)
          footer.logoLink = addLinkObject(navigationTree, mediaPool, footer.logoLink)

          return footer
        }
      }
    }
    return null
  }


  /**
   * fetch content and return a the result
   * @param navigationTree
   * @param navigationNodeId
   * @param callback
   */
  this.fetchContentByNavigationNodeId = function (navigationTree, navigationNodeId, callback) {

    const query = [
      `${voConfig.contentTypeNavigationNodes}<-${voConfig.contentTypeArticle}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockHeader}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockTitle}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockRichText}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockSpacer}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockImageSlider}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeBlockTeaserSpot}`,
      `${voConfig.contentTypeArticle}->${voConfig.contentTypeMedia}`,
      `${voConfig.contentTypeBlockHeader}->${voConfig.contentTypeMedia}`,
      `${voConfig.contentTypeBlockImageSlider}->${voConfig.contentTypeMedia}`,
      `${voConfig.contentTypeBlockTeaserSpot}->${voConfig.contentTypeMedia}`
    ]

    const url = getUrl() + "/" + voConfig.contentTypeNavigationNodes + "/" + navigationNodeId + "?flow=" + encodeURIComponent(JSON.stringify(query))
    log("CaasHelper.fetchContentByNavigationNodeId: " + url)
    fetch(url, getFetchOptions(voConfig))
      .then(status)
      .then(json)
      .then(response)
      .then(function (result) {
        log(JSON.stringify(result))
        const mediaPool = parseMedia(result)
        let parsedResult = {
          article: parseContent(navigationTree, result),
          mediaPool: mediaPool,
          navigationNodeId: navigationNodeId
        }
        if (isArticleActiveNow(parsedResult.article)) {
          callback(parsedResult)
        }
        else {
          callback(null)
        }
      })
      .catch(function (ex) {
        console.error('CaasHelper.fetchContentByNavigationNodeId failed', ex)
        log(ex.stack)
        callback(null)
      })
  }

  function parseContent (navigationTree, result) {
    if (result) {
      const mediaPool = parseMedia(result)
      if (result.hasOwnProperty(voConfig.contentTypeArticle)) {
        return parseArticle(navigationTree, mediaPool, result)
      }
    }

    return null
  }

  function parseMedia (result) {
    const mediaPool = result[voConfig.contentTypeMedia]
    for (let key in mediaPool) {
      if (mediaPool.hasOwnProperty(key)) {
        let media = mediaPool[key]
        media.url = `http://${config.mediaDomain}/image/upload/v${Math.round(media.version)}/${media.publicId}.${media.format}`
      }
    }
    return mediaPool
  }

  function parseArticle (navigationTree, mediaPool, result) {
    let articlePool = result[voConfig.contentTypeArticle]
    let article = null

    for (let articleId in articlePool) {
      if (articlePool.hasOwnProperty(articleId)) {
        article = articlePool[articleId]
        article.type = voConfig.contentTypeArticle
        article.shareImage = getMediaObjectById(mediaPool, article.shareImage)
        article.blocks = article.contents.reduce((previousValue, entity) => {
          let entityId
          for (let key in entity) {
            if (entity.hasOwnProperty(key)) {
              entityId = entity[key]
            }
          }
          let node = getNodeById(result, entityId)
          if (!node) {
            log("parseContent: " + entityId + " not found in result")
            return previousValue
          }

          let key2

          // Validate Block Objects

          node.content.id = entityId


          if (node.type === voConfig.contentTypeBlockHeader) {
            node.content.backgroundImage = getMediaObjectById(mediaPool, node.content.backgroundImage)
            node.content.title = addLinkObjectToRichText(navigationTree, mediaPool, node.content.title)
          }

          else if (node.type === voConfig.contentTypeBlockTitle) {
            node.content.title = addLinkObjectToRichText(navigationTree, mediaPool, node.content.title)
            node.content.subtitle = addLinkObjectToRichText(navigationTree, mediaPool, node.content.subtitle)
          }

          else if (node.type === voConfig.contentTypeBlockRichText) {
            node.content.title = addLinkObjectToRichText(navigationTree, mediaPool, node.content.title)
            node.content.textRight = addLinkObjectToRichText(navigationTree, mediaPool, node.content.textRight)
            node.content.textLeft = addLinkObjectToRichText(navigationTree, mediaPool, node.content.textLeft)
          }

          else if (node.type === voConfig.contentTypeBlockTeaserSpot) {
            for (key2 in node.content.list) {
              if (node.content.list.hasOwnProperty(key2)) {
                let row = node.content.list[key2]
                row.image = getMediaObjectById(mediaPool, row.image)
                row.imageLink = addLinkObject(navigationTree, mediaPool, row.imageLink)
                row.textBlock = addLinkObjectToRichText(navigationTree, mediaPool, row.textBlock)
              }
            }
          }

          else if (node.type === voConfig.contentTypeBlockImageSlider) {
            for (key2 in node.content.list) {
              if (node.content.list.hasOwnProperty(key2)) {
                let row = node.content.list[key2]
                row.image = getMediaObjectById(mediaPool, row.image)
              }
            }
          }

          previousValue.push(node)

          return previousValue
        }, [])
      }
    }

    return article
  }

  function getNodeById (objectPool, entityId) {
    for (let typeId in objectPool) {
      if (objectPool.hasOwnProperty(typeId)) {
        const typedPool = objectPool[typeId]
        if (typedPool.hasOwnProperty(entityId)) {
          return {
            type: typeId,
            content: typedPool[entityId]
          }
        }
      }
    }
  }

  function getArticleByNodeId (articlePool, nodeId) {
    for (let key in articlePool) {
      if (articlePool.hasOwnProperty(key)) {
        if (articlePool[key].navigationNode === nodeId) {
          return articlePool[key]
        }
      }
    }
    return null
  }

  /**
   * change the server result to a nested object
   * @param nodePool
   * @param articlePool
   * @param nodeIds
   * @param relativeUrl
   * @returns {*}
   */
  function createNodes (nodePool, articlePool, nodeIds, relativeUrl) {
    return nodeIds.reduce(function (previousValue, nodeId) {
      let url = relativeUrl
      if (!nodePool[nodeId]) {
        log("CaasHelper.createNodes: node " + nodeId + " not found")
        return previousValue
      }
      if (nodePool[nodeId].slug) {
        url += "/" + nodePool[nodeId].slug
      }
      previousValue.push({
        "id": nodeId,
        "label": nodePool[nodeId].label,
        "slug": nodePool[nodeId].slug,
        "relativeUrl": url,
        "showInMenu": nodePool[nodeId].showInMenu,
        "children": createNodes(nodePool, articlePool, nodePool[nodeId].children, url),
        "content": getArticleByNodeId(articlePool, nodeId)
      })
      return previousValue
    }, [])
  }
}

/**
 * searches an navigation node by his url and returns his id or null if not found
 * @param array
 * @param searchRelativeUrl
 * @returns String|null
 */
export function searchNavigationNodeByUrl (array, searchRelativeUrl) {
  if (!(array instanceof Array))return null

  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (stripSlashes(item.relativeUrl) === stripSlashes(searchRelativeUrl)) {
      return item.id
    }
    let foundNodeId = searchNavigationNodeByUrl(item.children, searchRelativeUrl)
    if (foundNodeId) {
      return foundNodeId
    }
  }
}

/**
 *
 * @param array
 * @param nodeId
 * @returns {null}
 */
export function searchNavigationNodeById (array, nodeId) {
  if (typeof nodeId === 'string' && array instanceof Array) {
    for (let key in array) {
      if (array.hasOwnProperty(key)) {
        const navigationNode = array[key]
        if (navigationNode.id === nodeId) {
          return navigationNode
        }

        let foundNode = searchNavigationNodeById(navigationNode.children, nodeId)
        if (foundNode) {
          return foundNode
        }
      }
    }
  }
}


/**
 *
 * @param node
 * @returns {boolean}
 */
export function isNodeVisible (node) {
  if (!node.showInMenu) {
    return false
  }
  if (hasContent(node.children)) {
    return true
  }
  if (node.content) {
    return isArticleActiveNow(node.content)
  }
  return true
}


/**
 *
 * @param article
 * @returns {boolean}
 */
export function isArticleActiveNow (article) {
  if (!article.isLive) {
    return false
  }

  let now = new Date().getTime()
  if (article.expiryDate !== 0 && now > article.expiryDate * 1000) {
    return false
  }

  if (article.publishDate !== 0 && now < article.publishDate * 1000) {
    return false
  }
  return true
}


function InvalidConfigException (message) {
  this.message = message;
}


/**
 *
 * @param user
 * @param pwd
 * @param database
 * @returns {Headers}
 */
async function signIn (user, pwd, database) {
  const url = getUrl() + "/_login"
  const options = {
    method: "POST",
    body: JSON.stringify({
      'username': user,
      'password': pwd,
      'database': database
    })
  }

  log("CaasHelper.signIn: " + url)
  return await fetch(url, options)
    .then(status)
    .then(json)
    .then(response)
    .then(function (result) {
      return result
    })
    .catch(function (ex) {
      console.error('CaasHelper.fetchNavigation failed', ex)
    })
}

function getFetchOptions (voConfig) {
  let headers = new Headers()
  headers.append("X-CaaS-User", voConfig.userSession['user-id'])
  headers.append("X-CaaS-Signature", voConfig.userSession['signature'])
  headers.append("X-CaaS-Database", voConfig.userSession['database'])

  return {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  }
}

/**
 * search the root navigation node.
 * @param voConfig
 */
async function fetchRootCategoryNode (voConfig) {
  let url = getUrl() + "/" + voConfig.contentTypeNavigationNodes
  log("CaasHelper.fetchRootCategoryNode: " + url)
  return await fetch(url, getFetchOptions(voConfig))
    .then(status)
    .then(json)
    .then(response)
    .then(function (result) {
      if (result) {
        let rootNavigationNodeId = null
        result.results.forEach((navigationNodes) => {
          for (let navigationNodeId in navigationNodes) {
            if (navigationNodes.hasOwnProperty(navigationNodeId)) {
              let navigationNode = navigationNodes[navigationNodeId]
              if (navigationNode.slug === "") {
                rootNavigationNodeId = navigationNodeId
                break
              }
            }
          }
        })
        return rootNavigationNodeId
      }
    })
    .catch(function (ex) {
      console.error('CaasHelper.fetchRootCategoryNode failed: ', ex)
    })
}

/**
 * Fetch all model types,
 */
async function fetchModelTypes(voConfig) {
  let url = getUrl()
  log("CaasHelper.fetchModelTypes: " + url)
  return await fetch(url, getFetchOptions(voConfig))
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      return response.response
    })
    .then(function (result) {
      if (result) {
        let modelDefinition = result.results.map((objectTypes) => {
          let voContentType
          for (let key in objectTypes) {
            if (objectTypes.hasOwnProperty(key)) {
              voContentType = new VoContentType(objectTypes[key], key)
            }
          }
          return voContentType
        })

        if (!hasContent(modelDefinition)) {
          throw new InvalidConfigException("no models defined")
        }

        modelDefinition.forEach((model) => {
          switch (model.key) {
            case "navigation-node":
              voConfig.contentTypeNavigationNodes = model.contentTypeId
              break
            case "article":
              voConfig.contentTypeArticle = model.contentTypeId
              break
            case "document":
              voConfig.contentTypeMedia = model.contentTypeId
              break
            case "blockHeader":
              voConfig.contentTypeBlockHeader = model.contentTypeId
              break
            case "blockTitle":
              voConfig.contentTypeBlockTitle = model.contentTypeId
              break
            case "blockRichText":
              voConfig.contentTypeBlockRichText = model.contentTypeId
              break
            case "blockTeaserSpot":
              voConfig.contentTypeBlockTeaserSpot = model.contentTypeId
              break
            case "blockImageSlider":
              voConfig.contentTypeBlockImageSlider = model.contentTypeId
              break
            case "blockSpacer":
              voConfig.contentTypeBlockSpacer = model.contentTypeId
              break
            case "blockFooter":
              voConfig.contentTypeBlockFooter = model.contentTypeId
          }
        })


        if (!(hasContent(voConfig.contentTypeNavigationNodes) &&
          hasContent(voConfig.contentTypeArticle))) {
          throw new InvalidConfigException("some default settings are missing")
        }

        return voConfig
      }
    }).catch(function (ex) {
      console.error('CaasHelper.fetchModelTypes failed', ex)
      return null
    })
}

function response(response) {
  return response.response
}

function json(response) {
  return response.json()
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(new Error(response.statusText))
  }
}
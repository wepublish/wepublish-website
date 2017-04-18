import React from 'react'
import {Entity, CharacterMetadata} from 'draft-js'
import ModAnchorTag from 'components/common/ModAnchorTag'
import {OrderedSet, is, List} from 'immutable';

const BLOCK_TYPE = {
  UNSTYLED: 'unstyled',
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  CODE: 'code-block',
  ATOMIC: 'atomic'
}

const ENTITY_TYPE = {
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  HORIZONTAL_RULER: 'HORIZONTAL_RULER'
}

const INLINE_STYLE = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE'
}

const DEFAULT_STYLE_ORDER = [
  INLINE_STYLE.BOLD,
  INLINE_STYLE.ITALIC,
  INLINE_STYLE.UNDERLINE,
  INLINE_STYLE.STRIKETHROUGH,
  INLINE_STYLE.CODE
]


export function createReactComponents (contentState) {
  //console.log("**************** createReactComponents ******************")
  var blocks = contentState.getBlocksAsArray()
  var renderedBlocks = blocks.reduce(renderBlockContent, {allBlocks: [], nesting: null})
  return <div className="rich-text">{renderedBlocks.allBlocks}</div>
}


function renderBlockContent (previousValue, block, index, array) {
  let blockType = block.getType()
  let text = block.getText()
  if (text === '') {
    if (previousValue.nesting) {
      nestLists(previousValue, index)
    }
    // Prevent element collapse if completely empty.
    previousValue.allBlocks.push(<br key={index}/>)
    return previousValue
  }

  let charMetaList = block.getCharacterList()
  let entityPieces = getEntityRanges(text, charMetaList)
  let content = entityPieces.map(([entityKey, stylePieces], indexPiece) => {
    let styledContent = stylePieces.map(([text, styleSet], indexStyle) => {
      let contentPiece = text

      for (let styleName of DEFAULT_STYLE_ORDER) {
        if (styleSet.has(styleName)) {
          let k = index + "_" + indexPiece + "_" + indexStyle
          switch (styleName) {
            case INLINE_STYLE.BOLD:
              contentPiece = <strong key={k}>{contentPiece}</strong>
              break
            case INLINE_STYLE.CODE:
              contentPiece = <code key={k}>{contentPiece}</code>
              break
            case INLINE_STYLE.ITALIC:
              contentPiece = <em key={k}>{contentPiece}</em>
              break
            case INLINE_STYLE.STRIKETHROUGH:
              contentPiece = <del key={k}>{contentPiece}</del>
              break
            case INLINE_STYLE.UNDERLINE:
              contentPiece = <ins key={k}>{contentPiece}</ins>
              break
          }
        }
      }
      return contentPiece
    })

    let entity = entityKey ? Entity.get(entityKey) : null
    let entityType = entity == null ? null : entity.getType().toUpperCase()
    if (entityType != null && entityType === ENTITY_TYPE.LINK) {
      styledContent = <ModAnchorTag key={indexPiece} linkObject={entity.getData()}>{styledContent}</ModAnchorTag>
    }
    else if (entityType != null && entityType === ENTITY_TYPE.HORIZONTAL_RULER) {
      styledContent = <hr key={indexPiece}/>
    }
    else if (entityType != null && entityType === ENTITY_TYPE.IMAGE) {
      // TODO
    }
    return styledContent
  })


  if (previousValue.nesting && (previousValue.nesting.type !== blockType)) {
    nestLists(previousValue, index)
  }

  switch (blockType) {
    case BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case BLOCK_TYPE.ORDERED_LIST_ITEM:
      if (previousValue.nesting === null) {
        previousValue.nesting = {
          type: blockType,
          list: []
        }
      }
      previousValue.nesting.list.push(<li key={index}>{content}</li>)
      if (index === array.length - 1) {
        nestLists(previousValue, index)
      }
      return previousValue
    case BLOCK_TYPE.HEADER_ONE:
      content = <h1 key={index}>{content}</h1>
      break
    case BLOCK_TYPE.HEADER_TWO:
      content = <h2 key={index}>{content}</h2>
      break
    case BLOCK_TYPE.HEADER_THREE:
      content = <h3 key={index}>{content}</h3>
      break
    case BLOCK_TYPE.HEADER_FOUR:
      content = <h4 key={index}>{content}</h4>
      break
    case BLOCK_TYPE.HEADER_FIVE:
      content = <h5 key={index}>{content}</h5>
      break
    case BLOCK_TYPE.HEADER_SIX:
      content = <h6 key={index}>{content}</h6>
      break
    case BLOCK_TYPE.BLOCKQUOTE:
      content = <blockquote key={index}>{content}</blockquote>
      break
    case BLOCK_TYPE.CODE:
      content = <pre key={index}><code>{content}</code></pre>
      break
    case BLOCK_TYPE.ATOMIC:
      content = <figure key={index}>{content}</figure>
      break
    default:
      content = <p key={index}>{content}</p>
  }

  previousValue.allBlocks.push(content)
  return previousValue
}


export const EMPTY_SET = new OrderedSet() // Style

/**
 *
 * @param text string
 * @param charMetaList CharacterMetaList
 * @returns Array
 */
export function getEntityRanges (text, charMetaList) {
  let charEntity = null
  let prevCharEntity = null
  let ranges = []
  let rangeStart = 0
  for (let i = 0, len = text.length; i < len; i++) {
    prevCharEntity = charEntity
    let meta = charMetaList.get(i)
    charEntity = meta ? meta.getEntity() : null
    if (i > 0 && charEntity !== prevCharEntity) {
      ranges.push([
        prevCharEntity,
        getStyleRanges(
          text.slice(rangeStart, i),
          charMetaList.slice(rangeStart, i)
        )
      ])
      rangeStart = i
    }
  }
  ranges.push([
    charEntity,
    getStyleRanges(
      text.slice(rangeStart),
      charMetaList.slice(rangeStart)
    )
  ])
  return ranges
}


/**
 * Handle ol & ul
 * @param previousValue
 * @param index
 */
function nestLists (previousValue, index) {
  let list = previousValue.nesting.list
  if (previousValue.nesting.type == BLOCK_TYPE.UNORDERED_LIST_ITEM) {
    list = <ul key={"ul" + index}>{list}</ul>
    previousValue.allBlocks.push(list)
  }
  else if (previousValue.nesting.type == BLOCK_TYPE.ORDERED_LIST_ITEM) {
    list = <ol key={"ol" + index}>{list}</ol>
    previousValue.allBlocks.push(list)
  }
  previousValue.nesting = null
}

/**
 *
 * @param text string
 * @param charMetaList CharacterMetaList
 * @returns Array
 */
function getStyleRanges (text, charMetaList) {
  let charStyle = EMPTY_SET
  let prevCharStyle = EMPTY_SET
  let ranges = []
  let rangeStart = 0
  for (let i = 0, len = text.length; i < len; i++) {

    prevCharStyle = charStyle
    let meta = charMetaList.get(i)
    charStyle = meta ? meta.getStyle() : EMPTY_SET
    if (i > 0 && !is(charStyle, prevCharStyle)) {
      ranges.push([text.slice(rangeStart, i), prevCharStyle])
      rangeStart = i
    }
  }
  ranges.push([text.slice(rangeStart), charStyle])
  return ranges
}
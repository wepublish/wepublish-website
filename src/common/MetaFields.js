import {hasContent} from 'common/DDUtil'

export function createMetaFields (content) {
  const fields = {
    "siteName": "dudawebsite",
    "title": "dudawebsite",
    "description": "",
    "keywords": "",
    "shareImage_url": "",
    "shareImage_secureUrl": "",
    "shareImage_format": "",
    "shareImage_width": "",
    "shareImage_height": ""
  }

  if (content && content.article) {
    if (hasContent(content.article.title)) {
      fields.title += " | " + content.article.title
    }
    if (hasContent(content.article.description)) {
      fields.description = content.article.description
    }
    if (hasContent(content.article.tags)) {
      fields.keywords = content.article.tags.toString()
    }
    if (content.article.shareImage) {
      try {
        fields.shareImage_url = content.article.shareImage.url
        fields.shareImage_secureUrl = content.article.shareImage.secureUrl
        fields.shareImage_format = 'image/' + content.article.shareImage.format
        fields.shareImage_width = content.article.shareImage.width
        fields.shareImage_height = content.article.shareImage.height
      } catch (e) {
      }
    }
  }

  return fields
}
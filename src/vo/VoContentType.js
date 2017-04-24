/**
 * @external VoContentType
 * @param obj {Object}
 * @param contentTypeId String
 * @constructor
 */
export default function VoContentType(obj, contentTypeId){
  this.key = obj.key
  this.contentTypeId = contentTypeId
  this.model = obj.model
}


// /**
//  *
//  * @constructor
//  */
// export default function VoNavigation(rootNode){
//
//   const _rootNode = rootNode
//
//   this.getRootNode = function(){
//     return _rootNode
//   }
//
//   function searchNavigationNodeByUrl(searchRelativeUrl) {
//     for (var key in _rootNode){
//       if (_rootNode.hasOwnProperty(key)) {
//         let item = _rootNode[key]
//         if (item.relativeUrl === searchRelativeUrl) {
//           return item.id
//         }
//         let foundNodeId = searchNavigationNodeByUrl(item.children, searchRelativeUrl)
//         if (foundNodeId) {
//           return foundNodeId
//         }
//       }
//     }
//   }
// }
var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup';
const endpoint = 'http://staging-api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

var session;
var _modelId;
var payload = require('../viewContext/contentTypeDescriptor.json')

toolSet.login(endpoint, user, pwd, database)
  .then(function (result) {
    session = result.response;
    return toolSet.authenticatedKarmaRequest(endpoint, session)
  })
  .then(function (result) {
    var modelList = result.response.results;
    for (var key in modelList) {
      if (modelList.hasOwnProperty(key)) {
        var model = modelList[key];
        for (var modelId in model) {
          if (model.hasOwnProperty(modelId)) {
            var modelObject = model[modelId];
            if (modelObject.key == '$karma_contentTypeDescriptor') {
              _modelId = modelId
              return modelId
            }
          }
        }
      }
    }
  })
  .then(function (result) {
    return new Promise(function (resolve, reject) {
      var allPromises = payload.map(function (item) {
        for (var contentId in item) {
          if (item.hasOwnProperty(contentId)) {
            return put(_modelId, contentId, item[contentId])
          }
        }
      })

      Promise.all(allPromises)
        .then(function (result) {
          resolve(result)
        })
        .catch(function (ex) {
          reject(ex)
        })
    })
  })
  .then(function (result) {
    console.log(result)
  })
  .catch(function (ex) {
    console.error(ex);
    reject(ex)
  });


function put (contentTypeId, contentId, payload) {
  return new Promise(function (resolve, reject) {
    var headers = new Headers();
    headers.append("X-CaaS-User", session['user-id']);
    headers.append("X-CaaS-Signature", session['signature']);
    headers.append("X-CaaS-Database", session['database']);

    const options = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(payload)
    };

    fetch(endpoint + '/' + contentTypeId + '/' + contentId, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (ex) {
        reject(ex)
      });
  })
}
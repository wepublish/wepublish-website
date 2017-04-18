var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup';
const endpoint = 'https://staging-api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

var session;

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
              return modelId
            }
          }
        }
      }
    }
  })
  .then(function (result) {
    return toolSet.authenticatedKarmaRequest(endpoint + '/' + result, session)
  })
  .then(function (result) {
    fs.writeFile("viewContext/contentTypeDescriptor.json", JSON.stringify(result.response.results), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
  .catch(function (ex) {
    console.error('copy of db\'s failed', ex);
    reject(ex)
  });

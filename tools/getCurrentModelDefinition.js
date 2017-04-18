var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup';
const endpoint = 'http://staging-api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

toolSet.login(endpoint, user, pwd, database)
  .then(function (result) {
    return toolSet.authenticatedKarmaRequest(endpoint, result)
  })
  .then(function (result) {
    fs.writeFile("temp/modelDefinition.json", JSON.stringify(result), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
  .catch(function (ex) {
    console.error('copy of db\'s failed', ex);
    reject(ex)
  });

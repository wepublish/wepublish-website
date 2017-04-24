var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup3';
const endpoint = 'https://api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

toolSet.login(endpoint, user, pwd, database)
  .then(function (result) {
    return toolSet.restoreDb(endpoint, result['user-id'], result.signature, result.database, 'dbExport/dump.tar.gz')
  })
  .then(function (result) {
    return toolSet.login(endpoint, user, pwd, database)
  })
  .then(function (result) {
    return toolSet.uploadFixtures(endpoint, result['user-id'], result.signature, result.database, 'fixtures')
  })
  .catch(function (ex) {
    console.error(ex);
    reject(ex)
  });
var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup3';
const sourceEndpoint = 'https://staging-api.karma.run';
const destinationEndpoint = 'https://staging-api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

toolSet.login(sourceEndpoint, user, pwd, database)
  .then(function (result) {
    return toolSet.dumpDb(sourceEndpoint, result['user-id'], result.signature, result.database, 'dbExport/dump.tar.gz')
  })
  // .then(function (result) {
  //   return toolSet.login(destinationEndpoint, user, pwd, database)
  // })
  // .then(function (result) {
  //   return toolSet.restoreDb(destinationEndpoint, result['user-id'], result.signature, result.database, 'dbExport/dump_fixed.json')
  // })
  .catch(function (ex) {
    console.error(ex);
    reject(ex)
  });


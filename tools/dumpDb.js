var toolSet = require('karma-tools');
var fs = require('fs');

// create a localsettings.json file -> content {"pwd": "..."} which should not added to version control
var settings = require('../localsettings.json');

const database = 'dudagroup3';
const sourceEndpoint = 'https://api.karma.run';
const destinationEndpoint = 'https://api.karma.run';
const user = 'admin';
const pwd = settings.pwd;

toolSet.login(sourceEndpoint, user, pwd, database)
  .then(function (result) {
    return toolSet.dumpDb(sourceEndpoint, result['user-id'], result.signature, result.database, 'dbExport/dump.tar.gz')
  })

  .catch(function (ex) {
    console.error(ex);
    reject(ex)
  });


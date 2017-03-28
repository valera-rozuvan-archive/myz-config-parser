'use strict';

var q = require('q'),
  readFile = require('./read_config').readFile;

function _parse(configFilePath) {
  var deferred = q.defer();

  readFile(configFilePath).then(function (fileData) {
    var configObj = null,
      error;

    try {
      configObj = JSON.parse(fileData);
    } catch (err) {
      error = new Error(err.message + ' in file ' + configFilePath);

      deferred.reject(error);

      return;
    }

    deferred.resolve(configObj);
  }, function (error) {
    deferred.reject(error);
  });

  return deferred.promise;
}

module.exports = {
  parse: _parse
};

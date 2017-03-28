'use strict';

var q = require('q'),
  readFile = require('./read_config').readFile;

function _parse(configFile) {
  var deferred = q.defer();

  readFile(configFile).then(function (fileData) {
    var configObj = null;

    try {
      configObj = JSON.parse(fileData);
    } catch (error) {
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

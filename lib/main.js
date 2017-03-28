'use strict';

var q = require('q');

function _parse(configFile) {
  var deferred = q.defer();

  if (typeof configFile === 'undefined') {
    deferred.reject();
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}

module.exports = {
  parse: _parse
};

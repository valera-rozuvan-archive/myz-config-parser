'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

var mainModule = require('../lib/main');

var expect = chai.expect;

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

function hello(name, cb) {
  cb('hello ' + name);
}

describe('hello', function () {
  it('should call callback with correct greeting', function () {
    var cb = sinon.spy();

    hello('foo', cb);

    cb.should.have.been.calledWith('hello foo');
  });
});

describe('main module', function () {
  var retVal;

  beforeEach(function () {
    retVal = null;
  });

  it('parse returns a promise object', function () {
    retVal = mainModule.parse();

    expect(retVal).to.be.an('object');
    expect(retVal.then).to.be.an('function');
  });

  it('parse promise is rejected if config file is undefined', function () {
    retVal = mainModule.parse();

    return retVal.should.be.rejected;
  });

  it('parse promise is resolved if config file is defined', function () {
    retVal = mainModule.parse('some text');

    return retVal.should.be.fulfilled;
  });
});

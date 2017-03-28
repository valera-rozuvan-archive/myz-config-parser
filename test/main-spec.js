'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var mainModule = require('../lib/main');

var expect = chai.expect;

chai.should();
chai.use(sinonChai);

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

  it('parse returns correct object', function () {
    retVal = mainModule.parse();

    expect(retVal).to.be.an('object');
  });

  it('parse returns an object with correct "a" property', function () {
    retVal = mainModule.parse();

    expect(retVal.a).to.equal(42);
  });
});

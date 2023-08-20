// const assert = require('assert');  // Node.js `assert` module
const should = require('chai').should();
const exchangeRate = require('../js/exchangeRate').getExchangeRate

describe('App test!', function () {
  it('환율 검증', function (done) {
    exchangeRate.should.be.a('string');
  });
});
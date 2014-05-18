'use strict';

jest.dontMock('../Transaction');

describe('Transaction', function() {

  var React;
  var TestUtils;
  var Transaction;

  var dummy;

  function forceTransaction() {
    TestUtils.renderIntoDocument(dummy);
  }

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    Transaction = require('../Transaction');

    var Dummy = React.createClass({
      render() {
        return React.DOM.div();
      }
    });

    dummy = Dummy();
  });

  it('isNotFound() returns false by default', function() {
    expect(Transaction.isNotFound()).toBe(false);
  });

  it('isNotFound() returns false even if transaction occurs', function() {
    forceTransaction();
    expect(Transaction.isNotFound()).toBe(false);
  });

  it('isNotFound() returns true if during a transaction there was a notification', function() {
    Transaction.notifyNotFound();
    expect(Transaction.isNotFound()).toBe(true);
  });

  it('isNotFound() returns false again if renders occurs w/o notification', function() {
    Transaction.notifyNotFound();
    expect(Transaction.isNotFound()).toBe(true);
    forceTransaction();
    expect(Transaction.isNotFound()).toBe(false);
  });
});

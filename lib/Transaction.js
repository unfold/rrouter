/**
 * @jsx React.DOM
 */
'use strict';

var ReactReconcileTransaction = require('react/lib/ReactReconcileTransaction');

var _isNotFound = false;

var TRANSACTION = {
  initialize: function() {
    _isNotFound = false;
  },

  close: function() {

  }
};

// XXX: hack!!!
ReactReconcileTransaction.prototype.getTransactionWrappers().push(TRANSACTION);

function isNotFound() {
  return _isNotFound;
}

function notifyNotFound() {
  _isNotFound = true;
}

module.exports = {isNotFound, notifyNotFound};

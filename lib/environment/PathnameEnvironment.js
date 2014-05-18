/**
 * @jsx React.DOM
 */
'use strict';

var Environment = require('./Environment');
var Transaction = require('../Transaction');

class PathnameEnvironment extends Environment {

  getPath() {
    return window.location.pathname;
  }

  notifyNotFound() {
    Transaction.notifyNotFound();
  }

  isNotFound() {
    return Transaction.isNotFound();
  }

  replacePath(path) {
    window.history.replaceState({}, '', path);
  }

  pushPath(path) {
    window.history.pushState({}, '', path);
  }

  start() {
    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  onPopState() {
    var path = this.getPath();
    if (path !== this.path) {
      this.setPath(this.getPath(), {isBack: true});
    }
  }
}

module.exports = PathnameEnvironment;

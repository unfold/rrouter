/**
 * @jsx React.DOM
 */
'use strict';

var Environment = require('./Environment');
var Transaction = require('../Transaction');

class HashEnvironment extends Environment {

  getPath() {
    return window.location.hash.slice(1) || '/';
  }

  notifyNotFound() {
    Transaction.notifyNotFound();
  }

  isNotFound() {
    return Transaction.isNotFound();
  }

  replacePath(path) {
    var href = window.location.href.replace(/(javascript:|#).*$/, '');
    window.location.replace(href + '#' + path);
  }

  pushPath(path) {
    window.location.hash = path;
  }

  start() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  onPopState() {
    var path = this.getPath();

    if (this.path !== path) {
      this.setPath(path, {isPopState: true});
    }
  }
}

module.exports = HashEnvironment;

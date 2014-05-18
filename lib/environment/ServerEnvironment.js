/**
 * @jsx React.DOM
 */
'use strict';

var invariant   = require('react/lib/invariant');
var Environment = require('./Environment');

class ServerEnvironment extends Environment {

  constructor(req) {
    this.req = req;
    this._isNotFound = false;
    super();
  }

  isNotFound() {
    return this._isNotFound;
  }

  notifyNotFound() {
    this._isNotFound = true;
  }

  getPath() {
    return this.req.path;
  }

  pushPath() {
    invariant(false);
  }

  replacePath() {
    invariant(false);
  }

  start() {
    invariant(false);
  }
}

module.exports = ServerEnvironment;

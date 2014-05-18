/**
 * @jsx React.DOM
 */
'use strict';

var RouterStateMixin = {

  getInitialState() {
    var path = this.getRoutingEnvironment().getPath();
    var navigation = {isInitial: true};
    return {path, navigation};
  },

  setPath(path, navigation, cb) {
    this.setState({path, navigation}, cb);
  }
};

module.exports = RouterStateMixin;

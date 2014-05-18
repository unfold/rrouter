/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react');
var merge            = require('react/lib/merge');
var RouterMixin      = require('./RouterMixin');
var RouterStateMixin = require('./RouterStateMixin');

var Router = React.createClass({
  mixins: [RouterMixin, RouterStateMixin],

  render() {
    var matched = this.getMatch(this.props.path || this.state.path);
    var props = merge(matched.route.props, matched.match);
    var handler = matched.route.handler(props);
    return handler;
  },

  getRoutes() {
    return this.props.children;
  }
});

module.exports = Router;

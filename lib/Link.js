/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');
var RoutingEnvironmentMixin = require('./RoutingEnvironmentMixin');
var environment             = require('./environment');

var Link = React.createClass({
  mixins: [RoutingEnvironmentMixin],

  propTypes: {
    hash: React.PropTypes.bool
  },

  render() {
    return (
      <a href={this.href()} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  },

  onClick(e) {
    var navigation = this.props.navigation || {};
    var env = this.getRoutingEnvironment();
    env.setPath(this.href(), navigation, () => {
      if (!env.isNotFound()) {
        e.preventDefault();
      }
    });
  },

  href() {
    return this.props.href;
  },

  createRoutingEnvironment() {
    if (this.props.hash) {
      return environment.hashEnvironment;
    } else {
      return environment.defaultEnvironment;
    }
  }
});

module.exports = Link;

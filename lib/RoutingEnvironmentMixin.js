/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var invariant = require('react/lib/invariant');

var RouterMixin = {

  contextTypes: {
    routingEnvironment: React.PropTypes.object
  },

  getRoutingEnvironment() {
    if (this.props.environment) {
      return this.props.environment;
    }

    if (this.context.routingEnvironment) {
      return this.context.routingEnvironment;
    }

    if (this.createRoutingEnvironment !== undefined) {
      if (this._environment === undefined) {
        this._environment = this.createRoutingEnvironment();
      }
      return this._environment;
    }

    invariant(
      false,
      "can't get routing environment"
    );
  },

  navigate(path, navigation, cb) {
    this.getRoutingEnvironment().setPath(path, navigation, cb);
  },

  componentDidMount() {
    var environment = this.getRoutingEnvironment();
    environment.register(this);
  },

  componentWillUnmount() {
    var environment = this.getRoutingEnvironment();
    environment.unregister(this);

    if (this._environment !== undefined) {
      this._environment = undefined;
    }
  }
};

module.exports = RouterMixin;

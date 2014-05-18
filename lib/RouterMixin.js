/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');
var emptyObject             = require('react/lib/emptyObject');
var pattern                 = require('url-pattern');
var RoutingEnvironmentMixin = require('./RoutingEnvironmentMixin');
var environment             = require('./environment');

function matchRoutes(routes, path) {
  var notFound = {handler: React.DOM.noscript};

  for (var i = 0, len = routes.length; i < len; i++) {
    var route = routes[i];

    if (route.path === undefined) {
      notFound = route;
      continue;
    }

    route.pattern = route.pattern || pattern.newPattern(route.path);

    var match = route.pattern.match(path);
    if (match) {
      return {route, match};
    }
  }

  return {
    route: notFound,
    match: emptyObject,
    isNotFound: true
  };
}

var RouterMixin = {
  mixins: [RoutingEnvironmentMixin],

  propTypes: {
    hash: React.PropTypes.bool
  },

  getMatch(path) {
    var routes = this.getRoutes();
    var matched = matchRoutes(routes, path);

    if (matched.isNotFound) {
      this.getRoutingEnvironment().notifyNotFound();
    }

    return matched;
  },

  createRoutingEnvironment() {
    if (this.props.hash) {
      return environment.hashEnvironment;
    } else {
      return environment.defaultEnvironment;
    }
  }
};

module.exports = RouterMixin;

/**
 * @jsx React.DOM
 */
'use strict';

var React             = require('react');
var emptyObject       = require('react/lib/emptyObject');
var invariant         = require('react/lib/invariant');
var cloneWithProps    = require('react/lib/cloneWithProps');
var ServerEnvironment = require('./environment/ServerEnvironment');
var Router            = require('./Router');
var Link              = require('./Link');

function withRoutingEnvironment(environment, scopedCallback) {
  return React.withContext({routingEnvironment: environment}, scopedCallback);
}

/**
 * Render component in a context of http request.
 *
 * @param {http.ClientRequest} req
 * @param {ReactComponent} component
 * @returns {Object}
 */
function renderComponentForRequest(req, component) {
  var environment = new ServerEnvironment(req);

  return withRoutingEnvironment(environment, () => {
    component = cloneWithProps(component, emptyObject);
    var markup = React.renderComponentToString(component);
    return {markup, isNotFound: environment.isNotFound()};
  });
}

function Route(props) {
  var path = props.path;
  var handler = props.handler;

  invariant(path !== undefined, 'path is not defined for a Route');
  invariant(handler !== undefined, 'handler is not defined for a Route');

  return {path, handler, props};
}

function NotFound(props) {
  var path = props.path;
  var handler = props.handler;

  invariant(path === undefined, 'path is defined for a NotFound route');
  invariant(handler !== undefined, 'handler is not defined');

  return {handler, props};
}

module.exports = {
  renderComponentForRequest,
  Router, Route, NotFound,
  Link
};

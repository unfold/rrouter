/**
 * @jsx React.DOM
 */
'use strict';

var React                 = require('react');
var createView            = require('../createView');
var matchRoutes           = require('../matchRoutes');
var fetchDataDependencies = require('../fetchDataDependencies');
var makeHref              = require('../makeHref');

function throwError(err) {
  throw err;
}



  function Routing(routes, onRoute, onError) {
    this.routes = routes;
    this.onRoute = onRoute;
    this.onError = onError || throwError;
    this.onChange = this.onChange.bind(this);
    this.path = undefined;
    this.match = undefined;
    this.started = false;
  }

  Routing.prototype.onChange=function() {
    var path = this.getPath();
    if (this.path !== path) {
      this.path = path;
      this.match = matchRoutes(this.routes, path);
      return fetchDataDependencies(this.match).then(function(match)  {
        this.match = match;
        var context = {match:match, routing: this, routes: this.routes};
        return React.withContext(context, function()  {
          var view = createView(match);
          this.onRoute(view, match);
        }.bind(this));
      }.bind(this), this.onError);
    }
  };

  Routing.prototype.navigate=function(path, navigation) {
    navigation = navigation || {};
    if (navigation.replace) {
      this.replacePath(path, navigation);
    } else {
      this.pushPath(path, navigation);
    }
    return this.onChange();
  };

  Routing.prototype.makeHref=function(name, params) {
    return makeHref(this.routes, name, this.match, params);
  };

  Routing.prototype.start=function() {
    if (!this.started) {
      this.doStart();
      this.onChange();
      this.started = true;
    }
    return this;
  };

  Routing.prototype.stop=function() {
    if (this.started) {
      this.doStop();
      this.started = false;
    }
    return this;
  };

  Routing.start=function(routes, onRoute, onError) {
    return new this(routes, onRoute, onError).start();
  };


module.exports = Routing;

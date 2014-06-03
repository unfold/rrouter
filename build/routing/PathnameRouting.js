/**
 * @jsx React.DOM
 */
'use strict';

var Routing = require('./Routing');

for(var Routing____Key in Routing){if(Routing.hasOwnProperty(Routing____Key)){PathnameRouting[Routing____Key]=Routing[Routing____Key];}}var ____SuperProtoOfRouting=Routing===null?null:Routing.prototype;PathnameRouting.prototype=Object.create(____SuperProtoOfRouting);PathnameRouting.prototype.constructor=PathnameRouting;PathnameRouting.__superConstructor__=Routing;function PathnameRouting(){if(Routing!==null){Routing.apply(this,arguments);}}

  PathnameRouting.prototype.getPath=function() {
    return window.location.pathname;
  };

  PathnameRouting.prototype.pushPath=function(path) {
    window.history.pushState({}, '', path);
  };

  PathnameRouting.prototype.replacePath=function(path) {
    window.history.replaceState({}, '', path);
  };

  PathnameRouting.prototype.doStart=function() {
    window.addEventListener('popstate', this.onChange);
  };

  PathnameRouting.prototype.doStop=function() {
    window.removeEventListener('popstate', this.onChange);
  };


module.exports = PathnameRouting;

/**
 * @jsx React.DOM
 */
'use strict';

var Routing = require('./Routing');

for(var Routing____Key in Routing){if(Routing.hasOwnProperty(Routing____Key)){HashRouting[Routing____Key]=Routing[Routing____Key];}}var ____SuperProtoOfRouting=Routing===null?null:Routing.prototype;HashRouting.prototype=Object.create(____SuperProtoOfRouting);HashRouting.prototype.constructor=HashRouting;HashRouting.__superConstructor__=Routing;function HashRouting(){if(Routing!==null){Routing.apply(this,arguments);}}

  HashRouting.prototype.getPath=function() {
    return window.location.hash.slice(1) || '/';
  };

  HashRouting.prototype.pushPath=function(path) {
    window.location.hash = path;
  };

  HashRouting.prototype.replacePath=function(path) {
    var href = window.location.href.replace(/(javascript:|#).*$/, '');
    window.location.replace(href + '#' + path);
  };

  HashRouting.prototype.doStart=function() {
    window.addEventListener('hashchange', this.onChange);
  };

  HashRouting.prototype.doStop=function() {
    window.removeEventListener('hashchange', this.onChange);
  };


module.exports = HashRouting;

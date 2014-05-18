/**
 * @jsx React.DOM
 */
'use strict';

var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var pathnameEnvironment;
var hashEnvironment;
var defaultEnvironment;

if (ExecutionEnvironment.canUseDOM) {

  var PathnameEnvironment = require('./PathnameEnvironment');
  var HashEnvironment     = require('./HashEnvironment');

  pathnameEnvironment = new PathnameEnvironment();
  hashEnvironment     = new HashEnvironment();

  var historyAPI = (window.history !== undefined
                    && window.history.pushState !== undefined);

  defaultEnvironment = historyAPI ? pathnameEnvironment : hashEnvironment;
}

module.exports = {
  defaultEnvironment, pathnameEnvironment, hashEnvironment
};

/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react');
var invariant           = require('react/lib/invariant');
var RoutingContextMixin = require('./RoutingContextMixin');
var makeHref            = require('./makeHref');

var Link = React.createClass({displayName: 'Link',
  mixins: [RoutingContextMixin],

  propTypes: {
    to: React.PropTypes.string,
    href: React.PropTypes.string
  },

  onClick: function(e) {
    e.preventDefault();
    this.navigate(this.href());
  },

  href: function() {
    if (this.props.href) {
      return this.props.href;
    } else if (this.props.to) {
      return makeHref(
        this.getRoutes(),
        this.props.to,
        this.getMatch(),
        this.props
      );
    } else {
      invariant(
        false,
        'provide either "to" or "href" prop to Link component'
      );
    }
  },

  render: function() {
    return this.transferPropsTo(
      React.DOM.a( {href:this.href(), onClick:this.onClick}, 
        this.props.children
      )
    );
  }
});

module.exports = Link;

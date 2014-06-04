/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react');
var LinkMixin = require('./LinkMixin');

var Link = React.createClass({displayName: 'Link',
  mixins: [LinkMixin],

  onClick: function(e) {
    e.preventDefault();
    this.navigate(this.href());
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

/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var RRouter   = require('../');

var Router = RRouter.Router;
var Route  = RRouter.Route;

describe('basic', function() {

  function createPage(contents) {
    return React.createClass({
      render: function() {
        return React.DOM.div(null, contents);
      }
    });
  }

  var App = React.createClass({

    render: function() {
      return (
        <Router ref="router">
          <Route path="/" handler={createPage('main')} />
          <Route path="/about" handler={createPage('about')} />
        </Router>
      );
    }
  });

  var app;

  beforeEach(function() {
    window.history.pushState({}, '', '/');
    app = TestUtils.renderIntoDocument(App());
  });

  it('renders main page', function() {
    expect(window.location.pathname).toBe('/');
    expect(app.getDOMNode().innerHTML).toBe('main');
  });

  describe('navigation via navigate()', function() {

    it('renders about page', function() {
      app.refs.router.navigate('/about');
      expect(window.location.pathname).toBe('/about');
      expect(app.getDOMNode().innerHTML).toBe('about');
    });
  });
});

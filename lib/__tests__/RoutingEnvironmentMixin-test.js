'use strict';

jest.dontMock('../RoutingEnvironmentMixin');

describe('RoutingEnvironmentMixin', function() {

  var React;
  var TestUtils;
  var RoutingEnvironmentMixin;
  var Router;
  var globalEnvironment;

  function renderRouter(props) {
    return TestUtils.renderIntoDocument(Router(props));
  }

  function genMockEnvironment() {
    return {
      getPath: jest.genMockFunction(),
      setPath: jest.genMockFunction(),
      register: jest.genMockFunction(),
      unregister: jest.genMockFunction()
    };
  }

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react/lib/ReactTestUtils');
    RoutingEnvironmentMixin = require('../RoutingEnvironmentMixin');
    globalEnvironment = genMockEnvironment();

    Router = React.createClass({
      mixins: [RoutingEnvironmentMixin],

      render() {
        return React.DOM.div();
      },

      createRoutingEnvironment() {
        return globalEnvironment;
      }
    });
  });

  describe('getRoutingEnvironment()', function() {

    it('uses routing environment from props', function() {
      var environment = genMockEnvironment();
      var router = renderRouter({environment: environment});
      expect(router.getRoutingEnvironment()).toBe(environment);
    });

    it('uses routing environment from context', function() {
      var environment = genMockEnvironment();
      var router = React.withContext({routingEnvironment: environment}, renderRouter);
      expect(router.getRoutingEnvironment()).toBe(environment);
    });

    it('uses routing environment returned from createRoutingEnvironment', function() {
      var router = renderRouter();
      expect(router.getRoutingEnvironment()).toBe(globalEnvironment);
    });

    it('prefers environment passed via props vs. via context', function() {
      var propsEnvironment = genMockEnvironment();
      var contextEnvironment = genMockEnvironment();
      var router = React.withContext({routingEnvironment: contextEnvironment}, function() {
        return renderRouter({environment: propsEnvironment});
      });
      expect(router.getRoutingEnvironment()).toBe(propsEnvironment);
    });

    it('prefers environment passed via context vs. via createRoutingEnvironment', function() {
      var contextEnvironment = genMockEnvironment();
      var router = React.withContext({routingEnvironment: contextEnvironment}, renderRouter);
      expect(router.getRoutingEnvironment()).toBe(contextEnvironment);
    });

    it('prefers environment passed via props vs. via createRoutingEnvironment', function() {
      var propsEnvironment = genMockEnvironment();
      var router = renderRouter({environment: propsEnvironment});
      expect(router.getRoutingEnvironment()).toBe(propsEnvironment);
    });
  });

  describe('registration with environment', function() {

    it('registers with environment on componentDidMount', function() {
      var router = renderRouter();
      expect(globalEnvironment.register).toBeCalled();
      expect(globalEnvironment.register).toBeCalledWith(router);
    });

    it('registers with environment on componentWillUnmount', function() {
      var router = renderRouter();
      router.componentWillUnmount();
      expect(globalEnvironment.unregister).toBeCalled();
      expect(globalEnvironment.unregister).toBeCalledWith(router);
    });
  });

  describe('navigate()', function() {

    it('delegates to an environment', function() {
      var router = renderRouter();

      var path = '/path';
      var navigation = {};
      var cb = jest.genMockFunction();

      router.navigate(path, navigation, cb);

      expect(globalEnvironment.setPath).toBeCalled();
      expect(globalEnvironment.setPath).toBeCalledWith(path, navigation, cb);
    });
  });

});

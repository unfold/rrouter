'use strict';

jest.dontMock('../Router');
jest.dontMock('../RoutingEnvironmentMixin');
jest.dontMock('../RouterMixin');
jest.dontMock('../RouterStateMixin');

describe('Router', function() {

  var React;
  var Router;
  var TestUtils;

  function testEnvironment(path) {
    return {
      getPath() {
        return path;
      },

      register: jest.genMockFunction(),
      unregister: jest.genMockFunction()
    };
  }

  function testHandler() {
    return jest.genMockFunction().mockReturnValueOnce(React.DOM.div());
  }

  function renderRouter(path, routes) {
    var router = Router({environment: testEnvironment(path)}, routes);
    router = TestUtils.renderIntoDocument(router);
    return router;
  }

  beforeEach(function() {
    React = require('react');
    Router = require('../Router');
    TestUtils = require('react/lib/ReactTestUtils');
  });

  it('correctly renders handler for a current path', function() {
    var main;
    var page;

    main = {path: '/', handler: testHandler()};
    page = {path: '/page', handler: testHandler()};

    renderRouter('/', [main, page]);
    expect(main.handler).toBeCalled();
    expect(page.handler).not.toBeCalled();

    main = {path: '/', handler: testHandler()};
    page = {path: '/page', handler: testHandler()};

    renderRouter('/page', [main, page]);
    expect(main.handler).not.toBeCalled();
    expect(page.handler).toBeCalled();
  });
});

# RRouter

RRouter is a router designed for [React][] and is a successor to
[react-router-component][].

## Basic usage

First, bring router and route descriptors into scope:

    var RRouter = require('rrouter')

    var Router = RRouter.Router;
    var Route = RRouter.Route;
    var NotFound = RRouter.NotFound;

Then define pages:

    var MainPage = React.createClass({ ... })
    var AboutPage = React.createClass({ ... })
    var NotFoundPage = React.createClass({ ... })

Now use router inside `render()` method of your application:

    var App = React.createClass({

      render() {
        return (
          <div>
            <h1>My App</h1>
            <Router>
              <Route path="/" handler={MainPage} />
              <Route path="/about" handler={AboutPage} />
              <NotFound handler={NotFoundPage} />
            </Router>
          </div>
        )
      }
    })

Now render you `App` component:

    React.renderComponent(App(), document.body)

That's all!

[React]: 
[react-router-component]: 

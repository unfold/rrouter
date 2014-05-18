/**
 * @jsx React.DOM
 */
'use strict';

class Environment {

  constructor() {
    this.routers = [];
  }

  notify(path, navigation, cb) {
    var latch = 0;

    function waitForLatch() {
      latch = latch + 1;
      if (cb && latch === this.routers.length) {
        cb();
      }
    }

    for (var i = 0, len = this.routers.length; i < len; i++) {
      this.routers[i].setPath(path, navigation, waitForLatch);
    }
  }

  setPath(path, navigation, cb) {
    navigation = navigation || {};
    if (!navigation.isBack) {
      if (navigation.replace) {
        this.replacePath(path);
      } else {
        this.pushPath(path);
      }
    }
    this.path = path;
    this.notify(path, navigation, cb);
  }

  register(router) {
    this.routers.push(router);
    if (this.routers.length === 1) {
      this.start();
    }
  }

  unregister(router) {
    var idx = this.routers.indexOf(router);
    if (idx > -1) {
      this.routers.splice(idx, 1);
    }
  }
}

module.exports = Environment;

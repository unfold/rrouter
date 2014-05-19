'use strict';

var ReactTools = require('react-tools');

module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules') > -1) {
      return src;
    }
    return ReactTools.transform(src, {harmony: true});
  }
};

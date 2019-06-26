'use strict';

/* eslint global-require: "off" */

module.exports = {
  general: require('./general'),
  intent: require('./intents'),
  intentConstants: require('./intentConstants'),
  draftToMarkdown: require('./draftToMarkdown'),
  intentCharRegex: require('./intentCharRegex'),
};

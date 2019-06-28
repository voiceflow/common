'use strict';

/* eslint global-require: "off" */

module.exports = {
  general: require('./general'),
  intent: require('./intents'),
  intentConstants: require('./intentConstants'),
  slotConstants: require('./slotConstants'),
  draftToMarkdown: require('./draftToMarkdown'),
  intentCharRegex: require('./intentCharRegex'),
};

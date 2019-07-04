'use strict';

// eslint-disable-next-line no-underscore-dangle
const _escape = function(word) {
  if (typeof word === 'string') {
    return word
      .replace(/'/g, "'")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/&/g, 'ampersand');
  }

  if (typeof word === 'number' || typeof word === 'boolean') {
    return word;
  }

  throw new Error(`received invalid type ${typeof word}`);
};

function renderBlock(block, index, rawDraftObject, options) {
  let markdownString = '';

  // Render text within content, along with any inline styles/entities
  Array.from(block.text).some(function(rawCharacter) {
    let character = rawCharacter;

    if (options.alexa) {
      character = _escape(character);
    }

    markdownString += character;
    return null;
  });

  return markdownString;
}

// TYLER - I JUST COPY AND PASTED THIS ENTIRE LIBRARY
function toPlainTextSanitize(rawDraftObject, rawOptions) {
  const options = rawOptions || {};
  let markdownString = '';

  rawDraftObject.blocks.forEach(function(block, index) {
    markdownString += renderBlock(block, index, rawDraftObject, options);
    if (options.newline) {
      markdownString += '\n';
    }
  });

  return markdownString;
}

const toPlainText = (rawDraftObject, options = {}) => {
  if (typeof rawDraftObject !== 'object') return rawDraftObject;

  let string = '';
  rawDraftObject.blocks.forEach((block) => {
    string += block.text;
    if (options.newline) {
      string += '\n';
    }
  });
  return string;
};

module.exports = {
  toPlainText,
  toPlainTextSanitize,
}
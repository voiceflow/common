'use strict';

/* eslint-disable max-depth */

const { find } = require('lodash');
const randomstring = require('randomstring');
const SLOT_TYPES = require('../constants/slots');
const { validSpokenCharacters, validLatinChars } = require('../constants/regex');
const draft = require('./draft');

const formatName = (name) => {
  let formattedName = name.replace(' ', '_');
  Array.from(Array(10).keys()).forEach((i) => {
    formattedName = formattedName.replace(i.toString(), String.fromCharCode(i + 65));
  });
  return formattedName;
};

const getUtterancesWithSlotNames = (utterances, slots, square_brackets = false, format_name = false, mention = false) => {
  const re = /({{\[([^[\]{}]+)]\.([\dA-Za-z]+)}})/g;
  let m;

  return utterances
    .map((e) => e.text)
    .filter((e) => !!e.trim())
    .map((input) => {
      let new_input = input;
      do {
        m = re.exec(input);
        if (m) {
          const replace = m[1];
          const slot_text = m[2];
          const key = m[3];
          const slot = find(slots, {
            key,
          });
          if (slot) {
            let slot_name = slot.name;
            if (format_name) slot_name = formatName(slot_name);
            if (mention) {
              if (slot_text !== slot_name) {
                const new_mention = replace.replace(slot_text, slot_name);
                new_input = new_input.replace(replace, new_mention);
              }
            } else if (square_brackets) {
              new_input = new_input.replace(replace, `[${slot_name}]`);
            } else {
              new_input = new_input.replace(replace, `{${slot_name}}`);
            }
          } else {
            return new_input;
          }
        }
      } while (m);
      return new_input;
    });
};

const getSlotType = (slot, platform) => {
  let type = slot.name;
  if (slot.type.value && slot.type.value.toLowerCase() !== 'custom') {
    const default_slot = find(SLOT_TYPES, (s) => s.label.toLowerCase() === slot.type.value.toLowerCase());
    if (!default_slot) {
      type = slot.type.value; // Platform specific slot
    } else {
      type = default_slot.type[platform];
    }
  }
  return type;
};

function unique(keys) {
  const keySet = new Set();

  keys.forEach((keyArr) => keyArr.forEach((key) => keySet.add(key)));

  return Array.from(keySet);
}

const getSlotsForKeysAndFormat = (keys, slots, platform) => {
  return unique(keys).map((key) => {
    const slot = find(slots, {
      key,
    });

    slot.name = formatName(slot.name);

    return {
      name: slot.name,
      type: getSlotType(slot, platform),
    };
  });
};

const getSlotsForKeys = (keys, slots, platform) => {
  return unique(keys).map((key) => {
    const slot = find(slots, { key });
    const slot_type = slot.type.value;
    let formatted_type = slot.name;

    if (slot_type && slot_type.toLowerCase() !== 'custom') {
      formatted_type = slot.type.value;
      const built_in_slot = find(SLOT_TYPES, { label: slot_type });
      if (built_in_slot && platform && built_in_slot.type[platform]) {
        formatted_type = built_in_slot.type[platform];
      }
    }

    return {
      name: slot.name,
      type: formatted_type,
    };
  });
};

const findSlot = (slot_type, platform) => {
  const built_in_slot = find(SLOT_TYPES, { label: slot_type });
  if (built_in_slot) return built_in_slot.type[platform];
  return null;
};

const replacer = (match, inner, slots, extracted) => {
  const slot = find(slots, { name: inner });
  if (slot) {
    slot.name = formatName(slot.name);
    extracted.push({
      name: slot.name,
      type: getSlotType(slot, 'alexa'),
    });
    return `{${slot.name}}`;
  }
  return inner.replace(/_/g, ' ');
};

exports.parseChoiceInput = (input, slots) => {
  const extracted = [];
  const cleansedInput = input.replace(/\[([A-Z_a-z]{1,170})]/g, (match, inner) => replacer(match, inner, slots, extracted)).replace();

  // get rid of any non valid characters
  const reg = new RegExp(`[^${validSpokenCharacters} .\\{\\}|]`, 'g');
  return {
    formatted_input: cleansedInput.replace(reg, ''),
    extracted_slots: extracted,
  };
};

exports.stripSample = (utterance) => {
  const reg = new RegExp(`[^${validSpokenCharacters}\\{\\}|]`, 'g');
  return utterance
    .replace(reg, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};
exports.utteranceToIntentName = (utterance, existing) => {
  const reg = new RegExp(`[^${validLatinChars}_|]`, 'g');
  // REGEX GOD
  let name = utterance
    .trim()
    .replace(/\s/g, '_')
    .replace(reg, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .substring(0, 170);

  // make sure the first letter is valid alphanumeric
  while (!/[A-Za-z]/.test(name.charAt(0)) && name.length > 0) {
    name = name.substring(1);
  }

  while (existing.has(name) || !name.trim()) {
    if (name.trim()) {
      name = `${name.substring(0, 164)}_`;
    }
    name += randomstring.generate({ length: 5, charset: 'alphabetic', capitalization: 'lowercase' });
  }

  name = name.replace(/_+/g, '_');

  return name;
};

const deepDraftToMarkdown = (object) => {
  const result = object;
  const variables = new Set();
  const regex = /{(\w*)}/g;

  const finder = (str) => {
    let match = regex.exec(str);
    while (match != null) {
      if (/\w{1,24}/.test(match[1])) {
        variables.add(match[1]);
      }
      match = regex.exec(str);
    }
  };

  const recurse = (sub_collection, resultToModify) => {
    if (sub_collection !== null && typeof sub_collection === 'object') {
      Object.keys(sub_collection).forEach((key) => {
        let val = sub_collection[key];
        if (typeof val === 'object' && val && val.blocks && val.entityMap) {
          val = draft.toPlainTextSanitize(val);
        }
        if (typeof val === 'object' && val && val.value !== undefined && typeof val.value !== 'object') {
          val = val.value;
        }
        resultToModify[key] = val;
        recurse(sub_collection[key], resultToModify[key]);
      });
    } else if (typeof sub_collection === 'string') {
      finder(sub_collection);
    }
  };

  recurse(object, result);
  return {
    result,
    variables: [...variables],
  };
};

const deepVariableSubstitution = (object, variableMap) => {
  const _replacer = (match, inner, variables_map, uriEncode = false) => {
    if (inner in variables_map) {
      return uriEncode ? encodeURI(variables_map[inner]) : variables_map[inner];
    }
    return match;
  };

  const recurse = (sub_collection, uriEncode = false) => {
    if (Array.isArray(sub_collection)) {
      return sub_collection.map((v) => recurse(v, uriEncode));
    }

    if (typeof sub_collection === 'object') {
      return Object.keys(sub_collection).reduce((acc, key) => {
        acc[key] = recurse(sub_collection[key], key === 'url');

        return acc;
      }, {});
    }

    if (typeof sub_collection === 'string') {
      return sub_collection.replace(/{(\w*)}/g, (match, inner) => _replacer(match, inner, variableMap, uriEncode));
    }

    return sub_collection;
  };

  return recurse(object);
};

exports.findSlot = findSlot;
exports.getUtterancesWithSlotNames = getUtterancesWithSlotNames;
exports.formatName = formatName;
exports.getSlotsForKeysAndFormat = getSlotsForKeysAndFormat;
exports.getSlotsForKeys = getSlotsForKeys;
exports.getSlotType = getSlotType;
exports.deepDraftToMarkdown = deepDraftToMarkdown;
exports.deepVariableSubstitution = deepVariableSubstitution;

/* eslint-enable max-depth */

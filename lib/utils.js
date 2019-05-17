'use strict';

/* eslint-disable no-process-env */
const _ = require('lodash');

/**
 * @class
 */
class Utils {
  /**
   * Convert AJV error object into error string
   * @param {object} errors
   * @return {string}
   */
  static stringifyAjvErrors(errors) {
    return errors
      .map((error) => {
        if (error.keyword === 'additionalProperties') {
          return `${error.dataPath.replace(/\//g, '.')} ${error.message} ${error.params.additionalProperty}`;
        }
        return `${error.dataPath.replace(/\//g, '.')} ${error.message}`;
      })
      .join(', ')
      .trim();
  }

  /**
   * Get enviroment variable or throw
   * @param {string} name
   * @return {string}
   */
  static getProcessEnv(name) {
    // eslint-disable-next-line no-process-env
    if (!process.env[name] || !process.env[name].trim()) {
      throw new Error(`env var: ${name} not found`);
    }

    // eslint-disable-next-line no-process-env
    return process.env[name].trim();
  }

  /**
   * Check if object type
   * @param {object} object
   * @param {string} path
   * @param {string} type
   * @return {undefined}
   */
  static check(object, path, type) {
    if (object === undefined) {
      throw new Error('type check object is not defined');
    }

    // capitalize first letter of type
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (path) object = _.get(object, path);

    if (!_[(`is${type}`)](object)) {
      throw new Error(`${path || 'check object'} must be a ${type.toLowerCase()}`);
    }
  }
}

module.exports = Utils;

'use strict';

/* eslint-disable no-process-env */
const _ = require('lodash');

const Utils = {
  /**
   * Convert AJV error object into error string
   * @param {object} errors
   * @return {string}
   */
  stringifyAjvErrors: (errors) =>
    errors
      .map((error) => {
        if (error.keyword === 'additionalProperties') {
          return `${error.dataPath.replace(/\//g, '.')} ${error.message} ${error.params.additionalProperty}`;
        }
        return `${error.dataPath.replace(/\//g, '.')} ${error.message}`;
      })
      .join(', ')
      .trim(),

  /**
   * Get enviroment variable or throw
   * @param {string} name
   * @return {boolean}
   */
  hasProcessEnv: (name) => _.has(process.env, name),

  /**
   * Get enviroment variable or throw
   * @param {string} name
   * @return {string}
   */
  getProcessEnv: (name) => {
    // eslint-disable-next-line no-process-env
    if (!process.env[name] || !process.env[name].trim()) {
      throw new Error(`env var: ${name} not found`);
    }

    // eslint-disable-next-line no-process-env
    return process.env[name].trim();
  },

  validateEmail: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Check if object type
   * @param {object} object
   * @param {string} path
   * @param {string} type
   * @param {function} errorCallback
   * @return {undefined}
   */
  check: (object, path, type, errorCallback = null) => {
    if (object === undefined) {
      throw new Error('type check object is not defined');
    }

    // capitalize first letter of type
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (path) object = _.get(object, path);

    if (!_[`is${type}`](object)) {
      const errorMessage = `${path || 'check object'} must be a ${type.toLowerCase()}`;
      if (typeof errorCallback === 'function') {
        throw errorCallback(errorMessage);
      } else {
        throw new Error(errorMessage);
      }
    }
  },
};

module.exports = Utils;

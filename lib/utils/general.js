'use strict';

const _ = require('lodash');

const GeneralUtils = () => {
  const self = {};
  /**
   * Convert AJV error object into error string
   * @param {object} errors
   * @return {string}
   */
  self.stringifyAjvErrors = (errors) =>
    errors
      .map((error) => {
        if (error.keyword === 'additionalProperties') {
          return `${error.dataPath.replace(/\//g, '.')} ${error.message} ${error.params.additionalProperty}`;
        }
        return `${error.dataPath.replace(/\//g, '.')} ${error.message}`;
      })
      .join(', ')
      .trim();

  /**
   * Get enviroment variable or throw
   * @param {string} name
   * @return {boolean}
   */
  self.hasProcessEnv = (name) => _.has(process.env, name); // eslint-disable-line no-process-env

  /**
   * Get enviroment variable or throw
   * @param {string} name
   * @return {string}
   */
  self.getProcessEnv = (name) => {
    // eslint-disable-next-line no-process-env
    if (!process.env[name] || !process.env[name].trim()) {
      throw new Error(`env var: ${name} not found`);
    }

    // eslint-disable-next-line no-process-env
    return process.env[name].trim();
  };

  self.optionalProcessEnv = (name) => (self.hasProcessEnv(name) ? self.getProcessEnv(name) : null);

  self.getProcessEnvWithDefault = (name, value) => self.optionalProcessEnv(name) ?? value

  self.validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  /**
   * Check if object type
   * @param {object} object
   * @param {string} path
   * @param {string} type
   * @param {function} errorCallback
   * @return {undefined}
   */
  self.check = (object, path, type, errorCallback = null) => {
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
  };

  self.checkServices = (dependencies, services) => {
    self.check(services, '', 'object');

    _.forEach(dependencies, (serviceName) => {
      self.check(services, [serviceName], 'object');
    });
  };

  self.generateEmptyServices = (dependencies) => {
    const services = {};

    _.forEach(dependencies, (serviceName) => {
      services[serviceName] = {};
    });

    return services;
  };

  self.generateHash = (object) => {
    if (typeof object === 'object') object = JSON.stringify(object);

    let hash = 0;
    let i;
    let chr;
    if (object.length === 0) return hash;
    for (i = 0; i < object.length; i++) {
      chr = object.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = (hash << 5) - hash + chr;
      // eslint-disable-next-line no-bitwise
      hash |= 0; // Convert to 32bit integer
    }

    return Math.abs(hash).toString();
  };

  self.generateID = () =>
    'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  return self;
};

module.exports = GeneralUtils();

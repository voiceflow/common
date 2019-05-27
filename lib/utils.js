'use strict';

/* eslint-disable no-process-env */
const _ = require('lodash');

const Utils = () => {
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
  self.hasProcessEnv = (name) => _.has(process.env, name);

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

  return self;
};

module.exports = Utils();

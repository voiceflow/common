'use strict';

/* eslint-disable no-process-env */

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
}

module.exports = Utils;

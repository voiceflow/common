'use strict';

const AJV = require('ajv');

const ajv = new AJV({
  allErrors: true,
  jsonPointers: true,
  useDefaults: true,
});
require('ajv-errors')(ajv, { singleError: true });

const { stringifyAjvErrors } = require('../utils');

const CONSTANTS = {
  RESPONSE_TYPES: {
    JSON: 'json',
    DOC: 'document',
    TEXT: 'text',
  },
  METHODS: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch',
  },
};

CONSTANTS.RESPONSE_TYPES_VALUES = Object.values(CONSTANTS.RESPONSE_TYPES);
CONSTANTS.METHODS_VALUES = Object.values(CONSTANTS.METHODS);

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['method', 'url', 'responseType'],
  properties: {
    method: { type: 'string', enum: CONSTANTS.METHODS_VALUES, default: CONSTANTS.METHODS.GET },
    url: { type: 'string', format: 'uri' },
    headers: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    params: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    data: {},
    responseType: {
      type: 'string',
      enum: CONSTANTS.RESPONSE_TYPES_VALUES,
      default: CONSTANTS.RESPONSE_TYPES.JSON,
    },
  },
};

const validate = ajv.compile(schema);

/**
 * @class
 */
class ApiIntegrationRequest {
  /**
   * @param {object} params
   * @returns {ApiIntegrationRequest}
   */
  constructor(params) {
    const valid = validate(params);

    if (!valid) {
      throw new Error(stringifyAjvErrors(validate.errors));
    }

    Object.assign(this, params);

    return this;
  }
}

module.exports = ApiIntegrationRequest;

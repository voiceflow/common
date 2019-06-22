'use strict';

const VError = require('@voiceflow/verror');
const _ = require('lodash');
const ipRangeCheck = require('ip-range-check');
const validator = require('validator');
const DNS = require('dns').promises;
const { checkServices } = require('../utils');
const { ApiIntegrationRequest } = require('../models');

const SERVICE_DEPENDENCIES = ['axios'];

const PROHIBITED_IP_RANGES = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8', '0.0.0.0/8', 'fd00::/8'];

const validateUrl = async (urlString) => {
  if (!_.isString(urlString)) {
    throw new VError('url is not a string', VError.HTTP_STATUS.BAD_REQUEST);
  }

  let url;
  try {
    url = new URL(urlString);
  } catch (err) {
    throw new VError(`url: ${urlString} could not be parsed`, VError.HTTP_STATUS.BAD_REQUEST);
  }

  const { hostname } = url;

  if (hostname.toLowerCase() === 'localhost') {
    throw new VError(`url hostname cannot be localhost: ${urlString}`, VError.HTTP_STATUS.BAD_REQUEST);
  }

  const ip = validator.isIP(hostname)
    ? hostname
    : await DNS.resolve(hostname).catch(() => {
        throw new VError(`cannot resolve hostname: ${hostname}`, VError.HTTP_STATUS.BAD_REQUEST);
      });

  PROHIBITED_IP_RANGES.map((prohibitedRange) => {
    if (ipRangeCheck(ip, prohibitedRange)) {
      throw new VError(`url resolves to IP: ${ip} in prohibited range: ${prohibitedRange}`, VError.HTTP_STATUS.BAD_REQUEST);
    }
  });

  return true;
};

/**
 * API integration handler
 * @param {object} services
 * @constructor
 */
function ApiIntegration(services) {
  const self = {};

  checkServices(SERVICE_DEPENDENCIES, services);

  const { axios } = services;

  self.api = async (request, resolveErrors = true) => {
    if (!(request instanceof ApiIntegrationRequest)) {
      request = new ApiIntegrationRequest(request);
    }

    await validateUrl(request.url);

    if (resolveErrors) {
      // Prevents it from rejecting with bad status response
      request.validateStatus = () => true;
    }

    return axios(request);
  };

  return self;
}

ApiIntegration.validateUrl = validateUrl;
module.exports = ApiIntegration;

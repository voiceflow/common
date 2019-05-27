'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const VError = require('@voiceflow/verror');
const { DateTime } = require('luxon');

const log = require('../../logger');

module.exports = function ResponseBuilder() {
  const self = {};

  /**
   * Determine http code from error
   * @param {Error} error error object or something and inheirits from it
   * @return {number} http code
   * @private
   */
  self._getCodeFromError = (error) => {
    if (error instanceof VError) {
      return error.code;
    }

    log.warn(`Unexpected error type: '${error.name}' from '${error.stack}'`);

    return VError.HTTP_STATUS.INTERNAL_SERVER_ERROR;
  };

  /**
   * Handle normal response
   * @param {*} data data to be returned from the endpoint
   * @param {number} [codeOverride] optionally override the default OK-200 code
   * @return {{versions: *, code: number, status: string, dateTime: string, timestamp: number, message: *, data: *}}
   * @private
   */
  self._okResponse = (data, codeOverride) => {
    const dateTime = DateTime.utc();
    const code = codeOverride || VError.HTTP_STATUS.OK;
    const response = {
      code,
      status: VError.HTTP_STATUS[code],
      dateTime: dateTime.toISO(),
      timestamp: dateTime.valueOf(),
    };

    if (data) {
      response.data = data;
    }

    return response;
  };

  /**
   * Handle error response
   * @param {Error} error error object or something and inheirits from it
   * @param {number} [codeOverride] optionally override the code specified in the error
   * @return {{versions: *, code: number, status: string, dateTime: string, timestamp: number, message: *, data: *}}
   * @private
   */
  self._errorResponse = (error, codeOverride) => {
    if (!(error instanceof Error)) {
      if (error instanceof String) {
        return self._errorResponse(new VError(error), codeOverride);
      }

      return self._errorResponse(new VError('Unexpected error'), codeOverride);
    }

    const dateTime = DateTime.utc();
    const code = codeOverride || self._getCodeFromError(error);

    const response = {
      data: error.data || {
        code,
        status: VError.HTTP_STATUS[code],
        dateTime: dateTime.toISO(),
        timestamp: dateTime.valueOf(),
      },
      code,
    };

    if (error.message && !error.data) {
      response.data.data = error.message;
    }

    if (response.code >= 500) {
      log.error(`500+ error: ${error.stack}`);
    }

    return response;
  };

  /**
   * Use express response object to respond with data or error
   * @param {Promise|Function} dataPromise promise that will resolve into a respnse or reject with an error
   * @param {number} [successCodeOverride] optionally override the success code specified in the error or the default OK
   * @param {number} [failureCodeOverride] optionally override the code specified in the error or the default 500
   * @return {Promise<void>}
   */
  self.route = (dataPromise, successCodeOverride, failureCodeOverride) => async (req, res, next) => {
    if (successCodeOverride && !Object.values(VError.HTTP_STATUS).includes(successCodeOverride)) {
      log.error('successCodeOverride must be a valid HTTP code, ignoring');
      successCodeOverride = undefined;
    }

    if (failureCodeOverride && !Object.values(VError.HTTP_STATUS).includes(failureCodeOverride)) {
      log.error('failureCodeOverride must be a valid HTTP code, ignoring');
      failureCodeOverride = undefined;
    }

    await Promise.try(() => (_.isFunction(dataPromise) ? dataPromise(req, res, next) : dataPromise))
      .then((data) => {
        if (data instanceof Error) {
          return self._errorResponse(data, failureCodeOverride);
        }

        return self._okResponse(data, successCodeOverride);
      })
      .catch((err) => self._errorResponse(err, failureCodeOverride))
      .then((output) => res.status(output.code).json(output.data));
  };

  return self;
};

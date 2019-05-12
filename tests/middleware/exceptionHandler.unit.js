'use strict';

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

const sinon = require('sinon');
const VError = require('@voiceflow/verror');
const { ExceptionHandler, ResponseBuilder } = require('../../lib').middleware;

describe('exceptionHandler unit tests', () => {
  it('handles 404', async () => {
    const exceptionHandler = new ExceptionHandler(new ResponseBuilder());

    const req = {
      originalUrl: 'http://google.com',
      method: 'POST',
    };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };

    await exceptionHandler.handleNotFound(req, res);

    expect(res.status.args[0][0]).to.eql(VError.HTTP_STATUS.NOT_FOUND);
    expect(res.status().json.args[0][0]).to.eql(undefined);
  });

  it('handles 500', async () => {
    const exceptionHandler = new ExceptionHandler(new ResponseBuilder());

    const error = new VError('boom');
    const req = {};
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub();

    await exceptionHandler.handleError(error, req, res, next);

    expect(res.status.args[0][0]).to.eql(VError.HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.status().json.args[0][0]).to.eql(undefined);
  });
});

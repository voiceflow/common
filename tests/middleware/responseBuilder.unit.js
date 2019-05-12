'use strict';

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

const HttpStatus = require('http-status');
const sinon = require('sinon');
const VError = require('@voiceflow/verror');
const { ResponseBuilder } = require('../../lib').middleware;

describe('responseBuilder unit tests', () => {
  it('returns ok response', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve) => resolve({ foo: 'bar' }));

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 200,
      data: {
        foo: 'bar',
      },
      status: 'OK',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns ok response with different code', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve) => resolve({ foo: 'bar' }));

    await responseBuilder.respond(res, dataPromise, VError.HTTP_STATUS.NO_CONTENT);

    const expected = {
      code: 204,
      data: {
        foo: 'bar',
      },
      status: 'No Content',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns ok response with no data', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve) => resolve());

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 200,
      status: 'OK',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve, reject) => reject(new VError('boom')));

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 500,
      status: 'Internal Server Error',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response with overridden code', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve, reject) => reject(new VError('boom')));

    await responseBuilder.respond(res, dataPromise, undefined, VError.HTTP_STATUS.BAD_REQUEST);

    const expected = {
      code: 400,
      status: 'Bad Request',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response when error is returned', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };

    await responseBuilder.respond(res, new VError('boom'));

    const expected = {
      code: 500,
      status: 'Internal Server Error',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response with Error', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve, reject) => reject(new Error('boom')));

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 500,
      status: 'Internal Server Error',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response with code 503', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve, reject) => reject(new VError('boom', HttpStatus.SERVICE_UNAVAILABLE)));

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 503,
      status: 'Service Unavailable',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql(expected.data);
  });

  it('returns bad response with data', async () => {
    const responseBuilder = new ResponseBuilder();
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
    const dataPromise = new Promise((resolve, reject) => reject(new VError('boom', undefined, { foo: 'bar' })));

    await responseBuilder.respond(res, dataPromise);

    const expected = {
      code: 500,
      status: 'Internal Server Error',
    };

    expect(res.status.args[0][0]).to.eql(expected.code);

    expect(res.status().json.args[0][0]).to.eql({ foo: 'bar' });
  });
});

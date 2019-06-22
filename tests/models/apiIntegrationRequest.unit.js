'use strict';

const { expect } = require('chai');

const { ApiIntegrationRequest } = require('../../lib/models');

describe('API integration request model', () => {
  it('accepts valid object', async () => {
    const params = {
      method: 'post',
      url: 'https://google.com',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        foo: 'bar',
      },
      params: {
        search: 'here',
      },
    };

    const request = new ApiIntegrationRequest(params);

    expect(request).to.eql(params);
  });

  it('rejects invalid method', async () => {
    const params = {
      method: 'head',
      url: 'https://google.com',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        foo: 'bar',
      },
      params: {
        search: 'here',
      },
    };

    expect(() => new ApiIntegrationRequest(params)).to.throw('.method should be equal to one of the allowed values: get, post, put, delete, patch');
  });

  it('rejects invalid headers', async () => {
    const params = {
      method: 'post',
      url: 'https://google.com',
      headers: {
        'content-type': {
          foo: 'application/json',
        },
      },
      data: {
        foo: 'bar',
      },
      params: {
        search: 'here',
      },
    };

    expect(() => new ApiIntegrationRequest(params)).to.throw('.headers.content-type should be string');
  });

  it('rejects invalid params', async () => {
    const params = {
      method: 'post',
      url: 'https://google.com',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        foo: 'bar',
      },
      params: {
        search: {
          foo: 'here',
        },
      },
    };

    expect(() => new ApiIntegrationRequest(params)).to.throw('.params.search should be string');
  });
});

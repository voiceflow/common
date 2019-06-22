'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

const sinon = require('sinon');
const { ApiIntegration } = require('../../lib/services');

describe('API integration unit tests', () => {
  it('accepts valid url', async () => {
    expect(await ApiIntegration.validateUrl('https://google.com')).to.eql(true);
  });

  it('rejects invalid url', async () => {
    await expect(ApiIntegration.validateUrl('fooooooo')).to.be.rejectedWith('url: fooooooo could not be parsed');
  });

  it('rejects unreachable url', async () => {
    await expect(ApiIntegration.validateUrl('https://asdfwerwer.com/')).to.be.rejectedWith('cannot resolve hostname: asdfwerwer.com');
  });

  it('rejects bad IP address', async () => {
    await expect(ApiIntegration.validateUrl('https://127.0.0.1/')).to.be.rejectedWith(
      'url resolves to IP: 127.0.0.1 in prohibited range: 127.0.0.0/8'
    );
  });

  it('makes request with axios', async () => {
    const request = {
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

    const services = {
      axios: sinon.stub().resolves({ foo: 'bar' }),
    };

    const apiIntegration = new ApiIntegration(services);
    const result = await apiIntegration.api(request);

    expect(result).to.eql({ foo: 'bar' });

    expect(JSON.parse(JSON.stringify(services.axios.args[0][0]))).to.eql({
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
      responseType: 'json',
    });

    expect(services.axios.args[0][0].validateStatus()).to.eql(true);
  });
});

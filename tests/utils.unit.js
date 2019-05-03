'use strict';

/* eslint-disable no-process-env */

const { expect } = require('chai');

const utils = require('../lib/utils');

describe('test utils functions', () => {
  it('throws if process env is not found', () => {
    expect(() => utils.getProcessEnv('FOO')).to.throw('env var: FOO not found');
    process.env.FOO = 'something';
    expect(utils.getProcessEnv('FOO')).to.eql('something');
  });
});

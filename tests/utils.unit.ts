import { expect } from 'chai';

import { general as utils } from '../lib/utils';

describe('test utils functions', () => {
  it('throws if process env is not found', () => {
    expect(() => utils.getProcessEnv('FOO')).to.throw('env var: FOO not found');
    process.env.FOO = 'something';
    expect(utils.getProcessEnv('FOO')).to.eql('something');
  });
});

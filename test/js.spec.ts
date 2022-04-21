/* eslint-disable @typescript-eslint/no-var-requires */
describe('Library js smoke test', () => {

  const instance = require('rubles').rubles;
  it('should works', () => {
    expect(instance(10)).toEqual('десять рублей 00 копеек');
  })

});

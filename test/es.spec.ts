import rubles from '../dist/index.es.js';

describe('Library es smoke test', () => {
  it('should works', () => {
    expect(rubles.rubles(10)).toEqual('десять рублей 00 копеек');
  })

});

import { rubles } from '../dist/index.cjs.js';

describe('Library cjs smoke test', () => {
  it('should works', () => {
    expect(rubles(10)).toEqual('десять рублей 00 копеек');
  })

});

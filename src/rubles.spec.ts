import {rubles} from './rubles';

describe('Rubles', () => {
  it('decimals', () => {
    expect(rubles(1.00)).toEqual('один рубль 00 копеек');
    expect(rubles(1.01)).toEqual('один рубль 01 копейка');
    expect(rubles(2.02)).toEqual('два рубля 02 копейки');
    expect(rubles(3.05)).toEqual('три рубля 05 копеек');
    expect(rubles(4.12)).toEqual('четыре рубля 12 копеек');
    expect(rubles(5.51)).toEqual('пять рублей 51 копейка');
    expect(rubles(9.99)).toEqual('девять рублей 99 копеек');
    expect(rubles(10.99)).toEqual('десять рублей 99 копеек');
  });

  it('decimals rounded', () => {
    expect(rubles(1.156)).toEqual('один рубль 16 копеек');
    expect(rubles('2,189')).toEqual('два рубля 19 копеек');
    expect(rubles(3.185)).toEqual('три рубля 19 копеек');
    expect(rubles(4.0185)).toEqual('четыре рубля 02 копейки');
    expect(rubles(5.134)).toEqual('пять рублей 13 копеек');
  });

  it('whole number', () => {
    expect(rubles(10)).toEqual('десять рублей 00 копеек');
    expect(rubles(12)).toEqual('двенадцать рублей 00 копеек');
    expect(rubles(52)).toEqual('пятьдесят два рубля 00 копеек');
    expect(rubles(100)).toEqual('сто рублей 00 копеек');
    expect(rubles(112)).toEqual('сто двенадцать рублей 00 копеек');
    expect(rubles(152)).toEqual('сто пятьдесят два рубля 00 копеек');
    expect(rubles(512)).toEqual('пятьсот двенадцать рублей 00 копеек');
    expect(rubles(552)).toEqual('пятьсот пятьдесят два рубля 00 копеек');
    expect(rubles(999)).toEqual('девятьсот девяносто девять рублей 00 копеек');
    expect(rubles(999.99)).toEqual('девятьсот девяносто девять рублей 99 копеек');
  });

  it('thousands', () => {
    expect(rubles(1000)).toEqual('одна тысяча рублей 00 копеек');
    expect(rubles(2000)).toEqual('две тысячи рублей 00 копеек');
    expect(rubles(5000)).toEqual('пять тысяч рублей 00 копеек');
    expect(rubles(1052)).toEqual('одна тысяча пятьдесят два рубля 00 копеек');
    expect(rubles(52151)).toEqual('пятьдесят две тысячи сто пятьдесят один рубль 00 копеек');
    expect(rubles(341000)).toEqual('триста сорок одна тысяча рублей 00 копеек');
    expect(rubles(123456)).toEqual('сто двадцать три тысячи четыреста пятьдесят шесть рублей 00 копеек');
    expect(rubles(999001)).toEqual('девятьсот девяносто девять тысяч один рубль 00 копеек');
    expect(rubles(999001.99)).toEqual('девятьсот девяносто девять тысяч один рубль 99 копеек');
  });

  it('millions', () => {
    expect(rubles(1000000)).toEqual('один миллион рублей 00 копеек');
    expect(rubles(2000000)).toEqual('два миллиона рублей 00 копеек');
    expect(rubles(5000000)).toEqual('пять миллионов рублей 00 копеек');
    expect(rubles(1000001)).toEqual('один миллион один рубль 00 копеек');
    expect(rubles(1001000)).toEqual('один миллион одна тысяча рублей 00 копеек');
    expect(rubles(1001001)).toEqual('один миллион одна тысяча один рубль 00 копеек');
    expect(rubles(12000000)).toEqual('двенадцать миллионов рублей 00 копеек');
    expect(rubles(52000000)).toEqual('пятьдесят два миллиона рублей 00 копеек');
    expect(rubles(52000122)).toEqual('пятьдесят два миллиона сто двадцать два рубля 00 копеек');
    expect(rubles(123456789)).toEqual('сто двадцать три миллиона четыреста пятьдесят шесть тысяч семьсот восемьдесят девять рублей 00 копеек');
  });

  it('billions', () => {
    expect(rubles(1000000000)).toEqual('один миллиард рублей 00 копеек');
    expect(rubles(2000000000)).toEqual('два миллиарда рублей 00 копеек');
    expect(rubles(5000000000)).toEqual('пять миллиардов рублей 00 копеек');
    expect(rubles(1000000001)).toEqual('один миллиард один рубль 00 копеек');
    expect(rubles(1000000100)).toEqual('один миллиард сто рублей 00 копеек');
    expect(rubles(1000001000)).toEqual('один миллиард одна тысяча рублей 00 копеек');
    expect(rubles(1001000000)).toEqual('один миллиард один миллион рублей 00 копеек');
    expect(rubles(1000001001)).toEqual('один миллиард одна тысяча один рубль 00 копеек');
    expect(rubles(1001001001)).toEqual('один миллиард один миллион одна тысяча один рубль 00 копеек');
    expect(rubles(999999999999)).toEqual('девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 00 копеек');
  });

  it('negative', () => {
    expect(rubles(-100)).toBe('');
    expect(rubles(-0.01)).toBe('');

    expect(rubles('-100')).toBe('');
    expect(rubles('-0.01')).toBe('');
  });

  it('wrong type', () => {
    const data = [undefined, false, 0, '0', '0.00', '0,00', 'test', [], [10], {}, {test: 10}];

    for (const element of data) {
      expect(rubles(element as any)).toBe('');
    }
  });

  describe('CurrencyCodes', () => {
    it('russian ruble', () => {
      expect(rubles(44.20)).toEqual('сорок четыре рубля 20 копеек');
      expect(rubles(44.20, 'RU')).toEqual('сорок четыре рубля 20 копеек');
      expect(rubles(44.2, 'BYN')).toEqual('сорок четыре белорусских рубля 20 копеек');
    });
  });
});

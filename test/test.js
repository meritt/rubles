import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { rubles } from '../lib/rubles.js';

function construct() {
  assert.equal(rubles(), null);

  const poor = [
    undefined,
    null,
    true,
    false,
    0,
    '0',
    '0.00',
    '0,00',
    'test',
    '5abc',
    '1.2.3',
    'Infinity',
    Number.NaN,
    Number.POSITIVE_INFINITY,
    [],
    [10],
    {},
    { test: 10 }
  ];

  for (const value of poor) {
    assert.equal(rubles(value), null, `rubles(${JSON.stringify(value)})`);
  }
}

function decimals() {
  assert.equal(rubles(1.0), 'один рубль 00 копеек');
  assert.equal(rubles(1.01), 'один рубль 01 копейка');
  assert.equal(rubles(2.02), 'два рубля 02 копейки');
  assert.equal(rubles(3.05), 'три рубля 05 копеек');
  assert.equal(rubles(4.12), 'четыре рубля 12 копеек');
  assert.equal(rubles(5.51), 'пять рублей 51 копейка');
  assert.equal(rubles(9.99), 'девять рублей 99 копеек');
}

function badDecimals() {
  assert.equal(rubles(1.156), 'один рубль 16 копеек');
  assert.equal(rubles('2,189'), 'два рубля 19 копеек');
  assert.equal(rubles(3.185), 'три рубля 19 копеек');
  assert.equal(rubles(4.0185), 'четыре рубля 02 копейки');
  assert.equal(rubles(5.134), 'пять рублей 13 копеек');
}

function precision() {
  assert.equal(rubles(1.005), 'один рубль 01 копейка');
  assert.equal(rubles('1,005'), 'один рубль 01 копейка');
  assert.equal(rubles('1.999'), 'два рубля 00 копеек');
  assert.equal(rubles('0,005'), '01 копейка');
}

function kopecksOnly() {
  assert.equal(rubles(0.5), '50 копеек');
  assert.equal(rubles(0.05), '05 копеек');
  assert.equal(rubles(0.01), '01 копейка');
  assert.equal(rubles('0,99'), '99 копеек');
  assert.equal(rubles(0.004), null);
}

function spacedStrings() {
  assert.equal(rubles('1 000,50'), 'одна тысяча рублей 50 копеек');
  assert.equal(
    rubles('52 151,31'),
    'пятьдесят две тысячи сто пятьдесят один рубль 31 копейка'
  );
  assert.equal(rubles('1 000'), 'одна тысяча рублей 00 копеек');
}

function dictionary() {
  const cases = [
    [1, 'один рубль 00 копеек'],
    [2, 'два рубля 00 копеек'],
    [3, 'три рубля 00 копеек'],
    [4, 'четыре рубля 00 копеек'],
    [5, 'пять рублей 00 копеек'],
    [6, 'шесть рублей 00 копеек'],
    [7, 'семь рублей 00 копеек'],
    [8, 'восемь рублей 00 копеек'],
    [9, 'девять рублей 00 копеек'],
    [10, 'десять рублей 00 копеек'],
    [11, 'одиннадцать рублей 00 копеек'],
    [12, 'двенадцать рублей 00 копеек'],
    [13, 'тринадцать рублей 00 копеек'],
    [14, 'четырнадцать рублей 00 копеек'],
    [15, 'пятнадцать рублей 00 копеек'],
    [16, 'шестнадцать рублей 00 копеек'],
    [17, 'семнадцать рублей 00 копеек'],
    [18, 'восемнадцать рублей 00 копеек'],
    [19, 'девятнадцать рублей 00 копеек'],
    [20, 'двадцать рублей 00 копеек'],
    [30, 'тридцать рублей 00 копеек'],
    [40, 'сорок рублей 00 копеек'],
    [50, 'пятьдесят рублей 00 копеек'],
    [60, 'шестьдесят рублей 00 копеек'],
    [70, 'семьдесят рублей 00 копеек'],
    [80, 'восемьдесят рублей 00 копеек'],
    [90, 'девяносто рублей 00 копеек'],
    [100, 'сто рублей 00 копеек'],
    [200, 'двести рублей 00 копеек'],
    [300, 'триста рублей 00 копеек'],
    [400, 'четыреста рублей 00 копеек'],
    [500, 'пятьсот рублей 00 копеек'],
    [600, 'шестьсот рублей 00 копеек'],
    [700, 'семьсот рублей 00 копеек'],
    [800, 'восемьсот рублей 00 копеек'],
    [900, 'девятьсот рублей 00 копеек']
  ];

  for (const [value, expected] of cases) {
    assert.equal(rubles(value), expected, `rubles(${value})`);
  }
}

function numbers() {
  assert.equal(rubles(12), 'двенадцать рублей 00 копеек');
  assert.equal(rubles(52), 'пятьдесят два рубля 00 копеек');
  assert.equal(rubles(100), 'сто рублей 00 копеек');
  assert.equal(rubles(112), 'сто двенадцать рублей 00 копеек');
  assert.equal(rubles(152), 'сто пятьдесят два рубля 00 копеек');
  assert.equal(rubles(512), 'пятьсот двенадцать рублей 00 копеек');
  assert.equal(rubles(552), 'пятьсот пятьдесят два рубля 00 копеек');
  assert.equal(rubles(999), 'девятьсот девяносто девять рублей 00 копеек');
}

function thousands() {
  assert.equal(rubles(1000), 'одна тысяча рублей 00 копеек');
  assert.equal(rubles(2000), 'две тысячи рублей 00 копеек');
  assert.equal(rubles(5000), 'пять тысяч рублей 00 копеек');
  assert.equal(rubles(1052), 'одна тысяча пятьдесят два рубля 00 копеек');
  assert.equal(
    rubles(52151),
    'пятьдесят две тысячи сто пятьдесят один рубль 00 копеек'
  );
  assert.equal(rubles(341000), 'триста сорок одна тысяча рублей 00 копеек');
  assert.equal(
    rubles(123456),
    'сто двадцать три тысячи четыреста пятьдесят шесть рублей 00 копеек'
  );
  assert.equal(
    rubles(999001),
    'девятьсот девяносто девять тысяч один рубль 00 копеек'
  );
}

function millions() {
  assert.equal(rubles(1000000), 'один миллион рублей 00 копеек');
  assert.equal(rubles(2000000), 'два миллиона рублей 00 копеек');
  assert.equal(rubles(5000000), 'пять миллионов рублей 00 копеек');
  assert.equal(rubles(1000001), 'один миллион один рубль 00 копеек');
  assert.equal(rubles(1001000), 'один миллион одна тысяча рублей 00 копеек');
  assert.equal(
    rubles(1001001),
    'один миллион одна тысяча один рубль 00 копеек'
  );
  assert.equal(rubles(12000000), 'двенадцать миллионов рублей 00 копеек');
  assert.equal(rubles(52000000), 'пятьдесят два миллиона рублей 00 копеек');
  assert.equal(
    rubles(52000122),
    'пятьдесят два миллиона сто двадцать два рубля 00 копеек'
  );
  assert.equal(
    rubles(123456789),
    'сто двадцать три миллиона четыреста пятьдесят шесть тысяч семьсот восемьдесят девять рублей 00 копеек'
  );
}

function billions() {
  assert.equal(rubles(1000000000), 'один миллиард рублей 00 копеек');
  assert.equal(rubles(2000000000), 'два миллиарда рублей 00 копеек');
  assert.equal(rubles(5000000000), 'пять миллиардов рублей 00 копеек');
  assert.equal(rubles(1000000001), 'один миллиард один рубль 00 копеек');
  assert.equal(rubles(1000000100), 'один миллиард сто рублей 00 копеек');
  assert.equal(
    rubles(1000001000),
    'один миллиард одна тысяча рублей 00 копеек'
  );
  assert.equal(
    rubles(1001000000),
    'один миллиард один миллион рублей 00 копеек'
  );
  assert.equal(
    rubles(1000001001),
    'один миллиард одна тысяча один рубль 00 копеек'
  );
  assert.equal(
    rubles(1001001001),
    'один миллиард один миллион одна тысяча один рубль 00 копеек'
  );
  assert.equal(
    rubles(999999999999),
    'девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 00 копеек'
  );
}

function bounds() {
  assert.equal(
    rubles(999999999999.99),
    'девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 99 копеек'
  );
  assert.equal(
    rubles('999 999 999 999,99'),
    'девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 99 копеек'
  );
  assert.equal(rubles(1000000000000), null);
  assert.equal(rubles('1000000000000'), null);
  assert.equal(rubles('999999999999,999'), null);
  assert.equal(rubles(Number.MAX_SAFE_INTEGER), null);
  assert.equal(rubles(1e21), null);
}

function currencyCodes() {
  assert.equal(rubles(44.2), 'сорок четыре рубля 20 копеек');
  assert.equal(rubles(44.2, 'RU'), 'сорок четыре рубля 20 копеек');
  assert.equal(rubles(44.2, 'XXX'), 'сорок четыре рубля 20 копеек');
  assert.equal(rubles(44.2, 'BYN'), 'сорок четыре белорусских рубля 20 копеек');
}

function belarusianPlurals() {
  assert.equal(rubles(1, 'BYN'), 'один белорусский рубль 00 копеек');
  assert.equal(rubles(2, 'BYN'), 'два белорусских рубля 00 копеек');
  assert.equal(rubles(5, 'BYN'), 'пять белорусских рублей 00 копеек');
  assert.equal(rubles(21, 'BYN'), 'двадцать один белорусский рубль 00 копеек');
}

function negative() {
  assert.equal(rubles(-100), null);
  assert.equal(rubles(-0.01), null);
  assert.equal(rubles('-100'), null);
  assert.equal(rubles('-0.01'), null);
}

describe('rubles', () => {
  it('construct', construct);
  it('decimals', decimals);
  it('bad decimals', badDecimals);
  it('precision', precision);
  it('kopecks only', kopecksOnly);
  it('spaced strings', spacedStrings);
  it('dictionary', dictionary);
  it('numbers', numbers);
  it('thousands', thousands);
  it('millions', millions);
  it('billions', billions);
  it('bounds', bounds);
  it('currencyCodes', currencyCodes);
  it('belarusianPlurals', belarusianPlurals);
  it('negative', negative);
});

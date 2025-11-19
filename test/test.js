'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert');

const construct = function (rubles) {
  let text = rubles();
  assert.strictEqual(text, false);

  const poor = [undefined, false, 0, '0', '0.00', '0,00', 'test', [], [10], {}, { test: 10 }];

  for (let i = 0; i < poor.length; i++) {
    text = rubles(poor[i]);
    assert.strictEqual(text, false);
  }
};

const decimals = {
  good: function (rubles) {
    let text = rubles(1.0);
    assert.strictEqual(text, 'один рубль 00 копеек');

    text = rubles(1.01);
    assert.strictEqual(text, 'один рубль 01 копейка');

    text = rubles(2.02);
    assert.strictEqual(text, 'два рубля 02 копейки');

    text = rubles(3.05);
    assert.strictEqual(text, 'три рубля 05 копеек');

    text = rubles(4.12);
    assert.strictEqual(text, 'четыре рубля 12 копеек');

    text = rubles(5.51);
    assert.strictEqual(text, 'пять рублей 51 копейка');

    text = rubles(9.99);
    assert.strictEqual(text, 'девять рублей 99 копеек');
  },

  poor: function (rubles) {
    let text = rubles(1.156);
    assert.strictEqual(text, 'один рубль 16 копеек');

    text = rubles('2,189');
    assert.strictEqual(text, 'два рубля 19 копеек');

    text = rubles(3.185);
    assert.strictEqual(text, 'три рубля 19 копеек');

    text = rubles(4.0185);
    assert.strictEqual(text, 'четыре рубля 02 копейки');

    text = rubles(5.134);
    assert.strictEqual(text, 'пять рублей 13 копеек');
  }
};

const numbers = function (rubles) {
  let text = rubles(12);
  assert.strictEqual(text, 'двенадцать рублей 00 копеек');

  text = rubles(52);
  assert.strictEqual(text, 'пятьдесят два рубля 00 копеек');

  text = rubles(100);
  assert.strictEqual(text, 'сто рублей 00 копеек');

  text = rubles(112);
  assert.strictEqual(text, 'сто двенадцать рублей 00 копеек');

  text = rubles(152);
  assert.strictEqual(text, 'сто пятьдесят два рубля 00 копеек');

  text = rubles(512);
  assert.strictEqual(text, 'пятьсот двенадцать рублей 00 копеек');

  text = rubles(552);
  assert.strictEqual(text, 'пятьсот пятьдесят два рубля 00 копеек');

  text = rubles(999);
  assert.strictEqual(text, 'девятьсот девяносто девять рублей 00 копеек');
};

const thousands = function (rubles) {
  let text = rubles(1000);
  assert.strictEqual(text, 'одна тысяча рублей 00 копеек');

  text = rubles(2000);
  assert.strictEqual(text, 'две тысячи рублей 00 копеек');

  text = rubles(5000);
  assert.strictEqual(text, 'пять тысяч рублей 00 копеек');

  text = rubles(1052);
  assert.strictEqual(text, 'одна тысяча пятьдесят два рубля 00 копеек');

  text = rubles(52151);
  assert.strictEqual(text, 'пятьдесят две тысячи сто пятьдесят один рубль 00 копеек');

  text = rubles(341000);
  assert.strictEqual(text, 'триста сорок одна тысяча рублей 00 копеек');

  text = rubles(123456);
  assert.strictEqual(text, 'сто двадцать три тысячи четыреста пятьдесят шесть рублей 00 копеек');

  text = rubles(999001);
  assert.strictEqual(text, 'девятьсот девяносто девять тысяч один рубль 00 копеек');
};

const millions = function (rubles) {
  let text = rubles(1000000);
  assert.strictEqual(text, 'один миллион рублей 00 копеек');

  text = rubles(2000000);
  assert.strictEqual(text, 'два миллиона рублей 00 копеек');

  text = rubles(5000000);
  assert.strictEqual(text, 'пять миллионов рублей 00 копеек');

  text = rubles(1000001);
  assert.strictEqual(text, 'один миллион один рубль 00 копеек');

  text = rubles(1001000);
  assert.strictEqual(text, 'один миллион одна тысяча рублей 00 копеек');

  text = rubles(1001001);
  assert.strictEqual(text, 'один миллион одна тысяча один рубль 00 копеек');

  text = rubles(12000000);
  assert.strictEqual(text, 'двенадцать миллионов рублей 00 копеек');

  text = rubles(52000000);
  assert.strictEqual(text, 'пятьдесят два миллиона рублей 00 копеек');

  text = rubles(52000122);
  assert.strictEqual(text, 'пятьдесят два миллиона сто двадцать два рубля 00 копеек');

  text = rubles(123456789);
  assert.strictEqual(
    text,
    'сто двадцать три миллиона четыреста пятьдесят шесть тысяч семьсот восемьдесят девять рублей 00 копеек'
  );
};

const billions = function (rubles) {
  let text = rubles(1000000000);
  assert.strictEqual(text, 'один миллиард рублей 00 копеек');

  text = rubles(2000000000);
  assert.strictEqual(text, 'два миллиарда рублей 00 копеек');

  text = rubles(5000000000);
  assert.strictEqual(text, 'пять миллиардов рублей 00 копеек');

  text = rubles(1000000001);
  assert.strictEqual(text, 'один миллиард один рубль 00 копеек');

  text = rubles(1000000100);
  assert.strictEqual(text, 'один миллиард сто рублей 00 копеек');

  text = rubles(1000001000);
  assert.strictEqual(text, 'один миллиард одна тысяча рублей 00 копеек');

  text = rubles(1001000000);
  assert.strictEqual(text, 'один миллиард один миллион рублей 00 копеек');

  text = rubles(1000001001);
  assert.strictEqual(text, 'один миллиард одна тысяча один рубль 00 копеек');

  text = rubles(1001001001);
  assert.strictEqual(text, 'один миллиард один миллион одна тысяча один рубль 00 копеек');

  text = rubles(999999999999);
  assert.strictEqual(
    text,
    'девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 00 копеек'
  );
};

const currencyCodes = function (rubles) {
  let text = rubles(44.2);
  assert.strictEqual(text, 'сорок четыре рубля 20 копеек');

  text = rubles(44.2, 'RU');
  assert.strictEqual(text, 'сорок четыре рубля 20 копеек');

  text = rubles(44.2, 'BYN');
  assert.strictEqual(text, 'сорок четыре белорусских рубля 20 копеек');
};

const negative = function (rubles) {
  let text = rubles(-100);
  assert.strictEqual(text, false);

  text = rubles(-0.01);
  assert.strictEqual(text, false);

  text = rubles('-100');
  assert.strictEqual(text, false);

  text = rubles('-0.01');
  assert.strictEqual(text, false);
};

describe('Rubles in JavaScript', function () {
  const rubles = require('../lib/rubles.js').rubles;

  it('construct', function () {
    construct(rubles);
  });

  it('decimals', function () {
    decimals.good(rubles);
  });
  it('bad decimals', function () {
    decimals.poor(rubles);
  });

  it('numbers', function () {
    numbers(rubles);
  });
  it('thousands', function () {
    thousands(rubles);
  });
  it('millions', function () {
    millions(rubles);
  });
  it('billions', function () {
    billions(rubles);
  });
  it('currencyCodes', function () {
    currencyCodes(rubles);
  });
  it('negative', function () {
    negative(rubles);
  });
});

describe('Rubles in minify JavaScript', function () {
  const rubles = require('../lib/rubles.min.js').rubles;

  it('construct', function () {
    construct(rubles);
  });

  it('decimals', function () {
    decimals.good(rubles);
  });
  it('bad decimals', function () {
    decimals.poor(rubles);
  });

  it('numbers', function () {
    numbers(rubles);
  });
  it('thousands', function () {
    thousands(rubles);
  });
  it('millions', function () {
    millions(rubles);
  });
  it('billions', function () {
    billions(rubles);
  });
  it('currencyCodes', function () {
    currencyCodes(rubles);
  });
  it('negative', function () {
    negative(rubles);
  });
});

'use strict';

var construct = function(rubles) {
  var text = rubles();
  text.should.be.false();

  var i;
  var poor = [undefined, false, 0, '0', '0.00', '0,00', 'test', [], [10], {}, {test: 10}];

  for (i = 0; i < poor.length; i++) {
    text = rubles(poor[i]);
    text.should.be.false();
  }
};

var decimals = {
  good: function(rubles) {
    var text = rubles(1.00);
    text.should.equal('один рубль 00 копеек');

    text = rubles(1.01);
    text.should.equal('один рубль 01 копейка');

    text = rubles(2.02);
    text.should.equal('два рубля 02 копейки');

    text = rubles(3.05);
    text.should.equal('три рубля 05 копеек');

    text = rubles(4.12);
    text.should.equal('четыре рубля 12 копеек');

    text = rubles(5.51);
    text.should.equal('пять рублей 51 копейка');

    text = rubles(9.99);
    text.should.equal('девять рублей 99 копеек');
  },

  poor: function(rubles) {
    var text = rubles(1.156);
    text.should.equal('один рубль 16 копеек');

    text = rubles('2,189');
    text.should.equal('два рубля 19 копеек');

    text = rubles(3.185);
    text.should.equal('три рубля 19 копеек');

    text = rubles(4.0185);
    text.should.equal('четыре рубля 02 копейки');

    text = rubles(5.134);
    text.should.equal('пять рублей 13 копеек');
  }
};

var numbers = function(rubles) {
  var text = rubles(12);
  text.should.equal('двенадцать рублей 00 копеек');

  text = rubles(52);
  text.should.equal('пятьдесят два рубля 00 копеек');

  text = rubles(100);
  text.should.equal('сто рублей 00 копеек');

  text = rubles(112);
  text.should.equal('сто двенадцать рублей 00 копеек');

  text = rubles(152);
  text.should.equal('сто пятьдесят два рубля 00 копеек');

  text = rubles(512);
  text.should.equal('пятьсот двенадцать рублей 00 копеек');

  text = rubles(552);
  text.should.equal('пятьсот пятьдесят два рубля 00 копеек');

  text = rubles(999);
  text.should.equal('девятьсот девяносто девять рублей 00 копеек');
};

var thousands = function(rubles) {
  var text = rubles(1000);
  text.should.equal('одна тысяча рублей 00 копеек');

  text = rubles(2000);
  text.should.equal('две тысячи рублей 00 копеек');

  text = rubles(5000);
  text.should.equal('пять тысяч рублей 00 копеек');

  text = rubles(1052);
  text.should.equal('одна тысяча пятьдесят два рубля 00 копеек');

  text = rubles(52151);
  text.should.equal('пятьдесят две тысячи сто пятьдесят один рубль 00 копеек');

  text = rubles(341000);
  text.should.equal('триста сорок одна тысяча рублей 00 копеек');

  text = rubles(123456);
  text.should.equal('сто двадцать три тысячи четыреста пятьдесят шесть рублей 00 копеек');

  text = rubles(999001);
  text.should.equal('девятьсот девяносто девять тысяч один рубль 00 копеек');
};

var millions = function(rubles) {
  var text = rubles(1000000);
  text.should.equal('один миллион рублей 00 копеек');

  text = rubles(2000000);
  text.should.equal('два миллиона рублей 00 копеек');

  text = rubles(5000000);
  text.should.equal('пять миллионов рублей 00 копеек');

  text = rubles(1000001);
  text.should.equal('один миллион один рубль 00 копеек');

  text = rubles(1001000);
  text.should.equal('один миллион одна тысяча рублей 00 копеек');

  text = rubles(1001001);
  text.should.equal('один миллион одна тысяча один рубль 00 копеек');

  text = rubles(12000000);
  text.should.equal('двенадцать миллионов рублей 00 копеек');

  text = rubles(52000000);
  text.should.equal('пятьдесят два миллиона рублей 00 копеек');

  text = rubles(52000122);
  text.should.equal('пятьдесят два миллиона сто двадцать два рубля 00 копеек');

  text = rubles(123456789);
  text.should.equal('сто двадцать три миллиона четыреста пятьдесят шесть тысяч семьсот восемьдесят девять рублей 00 копеек');
};

var billions = function(rubles) {
  var text = rubles(1000000000);
  text.should.equal('один миллиард рублей 00 копеек');

  text = rubles(2000000000);
  text.should.equal('два миллиарда рублей 00 копеек');

  text = rubles(5000000000);
  text.should.equal('пять миллиардов рублей 00 копеек');

  text = rubles(1000000001);
  text.should.equal('один миллиард один рубль 00 копеек');

  text = rubles(1000000100);
  text.should.equal('один миллиард сто рублей 00 копеек');

  text = rubles(1000001000);
  text.should.equal('один миллиард одна тысяча рублей 00 копеек');

  text = rubles(1001000000);
  text.should.equal('один миллиард один миллион рублей 00 копеек');

  text = rubles(1000001001);
  text.should.equal('один миллиард одна тысяча один рубль 00 копеек');

  text = rubles(1001001001);
  text.should.equal('один миллиард один миллион одна тысяча один рубль 00 копеек');

  text = rubles(999999999999);
  text.should.equal('девятьсот девяносто девять миллиардов девятьсот девяносто девять миллионов девятьсот девяносто девять тысяч девятьсот девяносто девять рублей 00 копеек');
};

var currencyCodes = function(rubles) {
  var text = rubles(44.20);
  text.should.equal('сорок четыре рубля 20 копеек');

  text = rubles(44.20, 'RU');
  text.should.equal('сорок четыре рубля 20 копеек');

  text = rubles(44.2, 'BYN');
  text.should.equal('сорок четыре белорусских рубля 20 копеек');
};

var negative = function(rubles) {
  var text = rubles(-100);
  text.should.be.false();

  text = rubles(-0.01);
  text.should.be.false();

  text = rubles('-100');
  text.should.be.false();

  text = rubles('-0.01');
  text.should.be.false();
};

describe('Rubles in JavaScript', function() {
  var path = (process.env.COVERAGE) ? '../lib-cov' : '../lib';
  var rubles = require(path + '/rubles.js').rubles;

  it('construct', function() {
    construct(rubles);
  });

  it('decimals', function() {
    decimals.good(rubles);
  });
  it('bad decimals', function() {
    decimals.poor(rubles);
  });

  it('numbers', function() {
    numbers(rubles);
  });
  it('thousands', function() {
    thousands(rubles);
  });
  it('millions', function() {
    millions(rubles);
  });
  it('billions', function() {
    billions(rubles);
  });
  it('currencyCodes', function() {
    currencyCodes(rubles);
  });
  it('negative', function() {
    negative(rubles);
  });
});

describe('Rubles in minify JavaScript', function() {
  var rubles = require('../lib/rubles.min.js').rubles;

  it('construct', function() {
    construct(rubles);
  });

  it('decimals', function() {
    decimals.good(rubles);
  });
  it('bad decimals', function() {
    decimals.poor(rubles);
  });

  it('numbers', function() {
    numbers(rubles);
  });
  it('thousands', function() {
    thousands(rubles);
  });
  it('millions', function() {
    millions(rubles);
  });
  it('billions', function() {
    billions(rubles);
  });
  it('currencyCodes', function() {
    currencyCodes(rubles);
  });
  it('negative', function() {
    negative(rubles);
  });
});

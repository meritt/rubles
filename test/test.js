import {assert} from "chai";
import {it, describe} from "mocha"
import {parseMoney} from "../lib/parse-money.js";

describe('Degrees', function () {
  it('100 RUB', function () {
    assert.equal(parseMoney(100, 'RUB'), 'сто рублей 00 копеек');
  });

  it('1000 RUB', function () {
    assert.equal(parseMoney(1000, 'RUB'), 'одна тысяча рублей 00 копеек');
  });

  it('10000 RUB', function () {
    assert.equal(parseMoney(10000, 'RUB'), 'десять тысяч рублей 00 копеек');
  });

  it('100000 RUB', function () {
    assert.equal(parseMoney(100000, 'RUB'), 'сто тысяч рублей 00 копеек');
  });

  it('1000000 RUB', function () {
    assert.equal(parseMoney(1000000, 'RUB'), 'один миллион рублей 00 копеек');
  });

  it('100000000 RUB', function () {
    assert.equal(parseMoney(100000000, 'RUB'), 'сто миллионов рублей 00 копеек');
  });

  it('1000000000 RUB', function () {
    assert.equal(parseMoney(1000000000, 'RUB'), 'один миллиард рублей 00 копеек');
  });

  it('100000000000 RUB', function () {
    assert.equal(parseMoney(100000000000, 'RUB'), 'сто миллиардов рублей 00 копеек');
  });
});

describe('RUB words', function () {
  it('1001 RUB', function () {
    assert.equal(parseMoney(1001, 'RUB'), 'одна тысяча один рубль 00 копеек');
  });

  it('1002 RUB', function () {
    assert.equal(parseMoney(1002, 'RUB'), 'одна тысяча два рубля 00 копеек');
  });

  it('1005 RUB', function () {
    assert.equal(parseMoney(1005, 'RUB'), 'одна тысяча пять рублей 00 копеек');
  });
});

describe('RUB bargaining words', function () {
  it('1001.01 RUB', function () {
    assert.equal(parseMoney(1001.01, 'RUB'), 'одна тысяча один рубль 01 копейка');
  });

  it('1002.02 RUB', function () {
    assert.equal(parseMoney(1002.02, 'RUB'), 'одна тысяча два рубля 02 копейки');
  });

  it('1005.20 RUB', function () {
    assert.equal(parseMoney(1005.20, 'RUB'), 'одна тысяча пять рублей 20 копеек');
  });
});

describe('USD words', function () {
  it('1001 RUB', function () {
    assert.equal(parseMoney(1001, 'USD'), 'одна тысяча один доллар США 00 центов');
  });

  it('1002 RUB', function () {
    assert.equal(parseMoney(1002, 'USD'), 'одна тысяча два доллара США 00 центов');
  });

  it('1005 RUB', function () {
    assert.equal(parseMoney(1005, 'USD'), 'одна тысяча пять долларов США 00 центов');
  });
});

describe('USD bargaining words', function () {
  it('1001.01 RUB', function () {
    assert.equal(parseMoney(1001.01, 'USD'), 'одна тысяча один доллар США 01 цент');
  });

  it('1002.02 RUB', function () {
    assert.equal(parseMoney(1002.02, 'USD'), 'одна тысяча два доллара США 02 цента');
  });

  it('1005.20 RUB', function () {
    assert.equal(parseMoney(1005.20, 'USD'), 'одна тысяча пять долларов США 20 центов');
  });
});

describe('EUR words', function () {
  it('1001 RUB', function () {
    assert.equal(parseMoney(1001, 'EUR'), 'одна тысяча один евро 00 центов');
  });

  it('1002 RUB', function () {
    assert.equal(parseMoney(1002, 'EUR'), 'одна тысяча два евро 00 центов');
  });

  it('1005 RUB', function () {
    assert.equal(parseMoney(1005, 'EUR'), 'одна тысяча пять евро 00 центов');
  });
});

describe('EUR bargaining words', function () {
  it('1001.01 RUB', function () {
    assert.equal(parseMoney(1001.01, 'EUR'), 'одна тысяча один евро 01 цент');
  });

  it('1002.02 RUB', function () {
    assert.equal(parseMoney(1002.02, 'EUR'), 'одна тысяча два евро 02 цента');
  });

  it('1005.20 RUB', function () {
    assert.equal(parseMoney(1005.20, 'EUR'), 'одна тысяча пять евро 20 центов');
  });
});




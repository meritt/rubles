(function() {
  'use strict';

  var words = [
    [
      '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
      'семь', 'восемь', 'девять', 'десять', 'одиннадцать',
      'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
      'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
    ],
    [
      '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
      'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
    ],
    [
      '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
      'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
    ]
  ];

  var rusRubles = ['рубль', 'рубля', 'рублей'];

  var belRubles = ['белорусский рубль', 'белорусских рубля', 'белорусских рублей'];

  var toFloat = function(number) {
    return parseFloat(number);
  };

  var genDefaultOptions = function(options) {
    var defaultOptions = {
      currCode: 'RU'
    };
    if (!options || typeof options === 'string') {
      defaultOptions.currCode = options;
      return defaultOptions;
    }
    return Object.getOwnPropertyNames(defaultOptions)
      .reduce(function(acc, propName) {
        if (propName in options) {
          acc[propName] = options[propName];
        }
        return acc;
      }, defaultOptions);
  };

  var plural = function(count, options) {
    if (options.length !== 3) {
      return false;
    }

    count = Math.abs(count) % 100;
    var rest = count % 10;

    if (count > 10 && count < 20) {
      return options[2];
    }

    if (rest > 1 && rest < 5) {
      return options[1];
    }

    if (rest === 1) {
      return options[0];
    }

    return options[2];
  };

  var parseNumber = function(number, count, currCode) {
    var first;
    var second;
    var numeral = '';

    if (number.length === 3) {
      first = number.substr(0, 1);
      number = number.substr(1, 3);
      numeral = '' + words[2][first] + ' ';
    }

    if (number < 20) {
      numeral = numeral + words[0][toFloat(number)] + ' ';
    } else {
      first = number.substr(0, 1);
      second = number.substr(1, 2);
      numeral = numeral + words[1][first] + ' ' + words[0][second] + ' ';
    }

    if (count === 0) {
      switch (currCode) {
        case 'BYN': {
          numeral = numeral + plural(number, belRubles);
          break;
        }
        case 'RU':
        default: {
          numeral = numeral + plural(number, rusRubles);
        }
      }
    } else if (count === 1) {
      if (numeral !== '  ') {
        numeral = numeral + plural(number, ['тысяча ', 'тысячи ', 'тысяч ']);
        numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
      }
    } else if (count === 2) {
      if (numeral !== '  ') {
        numeral = numeral + plural(number, ['миллион ', 'миллиона ', 'миллионов ']);
      }
    } else if (count === 3) {
      numeral = numeral + plural(number, ['миллиард ', 'миллиарда ', 'миллиардов ']);
    }

    return numeral;
  };

  var parseDecimals = function(number) {
    var text = plural(number, ['копейка', 'копейки', 'копеек']);

    if (number === 0) {
      number = '00';
    } else if (number < 10) {
      number = '0' + number;
    }

    return ' ' + number + ' ' + text;
  };

  var rubles = function(number, opt) {
    var options = genDefaultOptions(opt);

    if (!number) {
      return false;
    }

    var type = typeof number;
    if (type !== 'number' && type !== 'string') {
      return false;
    }

    if (type === 'string') {
      number = toFloat(number.replace(',', '.'));

      if (isNaN(number)) {
        return false;
      }
    }

    if (number <= 0) {
      return false;
    }

    var splt;
    var decimals;

    number = number.toFixed(2);
    if (number.indexOf('.') !== -1) {
      splt = number.split('.');
      number = splt[0];
      decimals = splt[1];
    }

    var numeral = '';
    var length = number.length - 1;
    var parts = '';
    var count = 0;
    var digit;

    while (length >= 0) {
      digit = number.substr(length, 1);
      parts = digit + parts;

      if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
        numeral = parseNumber(parts, count, options.currCode) + numeral;
        parts = '';
        count++;
      }

      length--;
    }

    numeral = numeral.replace(/\s+/g, ' ');

    if (decimals) {
      numeral = numeral + parseDecimals(toFloat(decimals));
    }

    return numeral;
  };

  var globals;

  if (typeof module !== 'undefined' && module !== null) {
    globals = exports;
  } else {
    globals = window;
  }

  globals.rubles = rubles;

})();

const words = [
  [
    '',
    'один',
    'два',
    'три',
    'четыре',
    'пять',
    'шесть',
    'семь',
    'восемь',
    'девять',
    'десять',
    'одиннадцать',
    'двенадцать',
    'тринадцать',
    'четырнадцать',
    'пятнадцать',
    'шестнадцать',
    'семнадцать',
    'восемнадцать',
    'девятнадцать'
  ],
  [
    '',
    '',
    'двадцать',
    'тридцать',
    'сорок',
    'пятьдесят',
    'шестьдесят',
    'семьдесят',
    'восемьдесят',
    'девяносто'
  ],
  [
    '',
    'сто',
    'двести',
    'триста',
    'четыреста',
    'пятьсот',
    'шестьсот',
    'семьсот',
    'восемьсот',
    'девятьсот'
  ]
];

const feminineOnes = ['', 'одна', 'две'];

const rusRubles = ['рубль', 'рубля', 'рублей'];
const belRubles = [
  'белорусский рубль',
  'белорусских рубля',
  'белорусских рублей'
];
const kopecksWords = ['копейка', 'копейки', 'копеек'];

const scales = [
  null,
  ['тысяча', 'тысячи', 'тысяч'],
  ['миллион', 'миллиона', 'миллионов'],
  ['миллиард', 'миллиарда', 'миллиардов']
];

const maxKopecks = 99999999999999;

export function rubles(input, currencyCode) {
  const total = parseAmount(input);
  if (total === null) {
    return null;
  }

  const rub = Math.floor(total / 100);
  const kop = total % 100;
  const currency = currencyCode === 'BYN' ? belRubles : rusRubles;
  const parts = [];

  if (rub > 0) {
    const groups = splitGroups(rub);

    for (let index = groups.length - 1; index > 0; index--) {
      if (groups[index] === 0) {
        continue;
      }

      parts.push(...groupWords(groups[index], index === 1));
      parts.push(plural(groups[index], scales[index]));
    }

    parts.push(...groupWords(groups[0], false));
    parts.push(plural(groups[0], currency));
  }

  parts.push(String(kop).padStart(2, '0'), plural(kop, kopecksWords));

  return parts.join(' ');
}

function parseAmount(input) {
  const total = parseKopecks(input);

  if (total === null || total <= 0 || total > maxKopecks) {
    return null;
  }

  return total;
}

function parseKopecks(input) {
  if (typeof input === 'number') {
    if (!Number.isFinite(input) || input <= 0) {
      return null;
    }

    return Math.round(Number((input * 100).toPrecision(15)));
  }

  if (typeof input === 'string') {
    return parseStringKopecks(input);
  }

  return null;
}

function parseStringKopecks(value) {
  const normalized = value.replaceAll(/\s/g, '').replaceAll(',', '.');

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }

  const [whole, fraction = ''] = normalized.split('.');

  let kopecks = Number(`${fraction}00`.slice(0, 2));
  if (fraction.length > 2 && fraction[2] >= '5') {
    kopecks = kopecks + 1;
  }

  return Number(whole) * 100 + kopecks;
}

function splitGroups(value) {
  const groups = [];
  let rest = value;

  while (rest > 0) {
    groups.push(rest % 1000);
    rest = Math.floor(rest / 1000);
  }

  return groups;
}

function groupWords(value, feminine) {
  const parts = [];
  const hundreds = Math.floor(value / 100);
  const rest = value % 100;

  if (hundreds > 0) {
    parts.push(words[2][hundreds]);
  }

  if (rest >= 20) {
    pushTens(parts, rest, feminine);
  } else {
    pushOnes(parts, rest, feminine);
  }

  return parts;
}

function pushTens(parts, value, feminine) {
  parts.push(words[1][Math.floor(value / 10)]);
  pushOnes(parts, value % 10, feminine);
}

function pushOnes(parts, value, feminine) {
  if (value === 0) {
    return;
  }

  if (feminine && value < 3) {
    parts.push(feminineOnes[value]);
  } else {
    parts.push(words[0][value]);
  }
}

function plural(count, options) {
  const value = Math.abs(count) % 100;
  const rest = value % 10;

  if (value > 10 && value < 20) {
    return options[2];
  }

  if (rest > 1 && rest < 5) {
    return options[1];
  }

  if (rest === 1) {
    return options[0];
  }

  return options[2];
}

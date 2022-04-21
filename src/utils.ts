export const words: string[][] = [
  [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ],
  [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ],
  [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ],
];

export const rusRubles: string[] = ["рубль", "рубля", "рублей"];

export const belRubles: string[] = [
  "белорусский рубль",
  "белорусских рубля",
  "белорусских рублей",
];

export function toFloat(number: string): number {
  return parseFloat(number);
}

export function plural(count, options) {
  if (options.length !== 3) {
    return false;
  }

  count = Math.abs(count) % 100;
  const rest = count % 10;

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
}

export function parseNumber(
  number: string,
  count: number,
  currencyCode: string
): string {
  let first;
  let second;
  let numeral = "";

  if (number.length === 3) {
    first = number.substring(0, 1);
    number = number.substring(1, 4);
    numeral = "" + words[2][first] + " ";
  }

  if (parseInt(number, 10) < 20) {
    numeral = numeral + words[0][toFloat(number)] + " ";
  } else {
    first = number.substring(0, 1);
    second = number.substring(1, 3);
    numeral = numeral + words[1][first] + " " + words[0][second] + " ";
  }

  if (count === 0) {
    switch (currencyCode) {
      case "BYN": {
        numeral = numeral + plural(number, belRubles);
        break;
      }
      case "RU":
      default: {
        numeral = numeral + plural(number, rusRubles);
      }
    }
  } else if (count === 1) {
    if (numeral !== "  ") {
      numeral = numeral + plural(number, ["тысяча ", "тысячи ", "тысяч "]);
      numeral = numeral.replace("один ", "одна ").replace("два ", "две ");
    }
  } else if (count === 2) {
    if (numeral !== "  ") {
      numeral =
        numeral + plural(number, ["миллион ", "миллиона ", "миллионов "]);
    }
  } else if (count === 3) {
    numeral =
      numeral + plural(number, ["миллиард ", "миллиарда ", "миллиардов "]);
  }

  return numeral;
}

export function parseDecimals(number: number): string {
  const text = plural(number, ["копейка", "копейки", "копеек"]);

  let strNumber = "";

  if (number === 0) {
    strNumber = "00";
  } else if (number < 10) {
    strNumber = "0" + number;
  } else {
    strNumber = number.toString();
  }

  return ` ${strNumber} ${text}`;
}

import { parseDecimals, parseNumber, toFloat } from "./utils";

/**
 *
 * @param number сумма (может быть числом или строкой)
 * @param {string=} currencyCode код валюты: RU | BYN
 * @returns сумма прописью
 */
export function rubles(number: number | string, currencyCode?: string): string {
  if (!number) {
    return "";
  }

  if (typeof number !== "number" && typeof number !== "string") {
    return "";
  }

  if (typeof number === "string") {
    number = toFloat(number.replace(",", "."));

    if (isNaN(number)) {
      return "";
    }
  }

  if (number <= 0) {
    return "";
  }

  let splt;
  let decimals;

  let _number = number.toFixed(2);
  if (_number.indexOf(".") !== -1) {
    splt = _number.split(".");
    _number = splt[0];
    decimals = splt[1];
  }

  let numeral = "";
  let length = _number.length - 1;
  let parts = "";
  let count = 0;
  let digit;

  while (length >= 0) {
    digit = _number.substring(length, length + 1);
    parts = digit + parts;

    if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
      numeral = parseNumber(parts, count, currencyCode) + numeral;
      parts = "";
      count++;
    }

    length--;
  }

  numeral = numeral.replace(/\s+/g, " ");

  if (decimals) {
    numeral = numeral + parseDecimals(toFloat(decimals));
  }

  return numeral;
}

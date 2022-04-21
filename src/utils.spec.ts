import { parseDecimals, parseNumber } from "./utils";

describe("Utils", () => {
  it("parseNumber", () => {
    expect(parseNumber("1", 0, "RU")).toEqual("один рубль");
    expect(parseNumber("10", 0, "RU")).toEqual("десять рублей");
    expect(parseNumber("1", 1, "RU")).toEqual("одна тысяча ");
  });
  it("parseDecimals", () => {
    expect(parseDecimals(1)).toEqual(" 01 копейка");
    expect(parseDecimals(3)).toEqual(" 03 копейки");
    expect(parseDecimals(10)).toEqual(" 10 копеек");
    expect(parseDecimals(11)).toEqual(" 11 копеек");
    expect(parseDecimals(99)).toEqual(" 99 копеек");
  });
});

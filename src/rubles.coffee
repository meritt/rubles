"use strict"

words = [
  ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать']
  ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто']
  ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']
]

toFloat = (number) -> parseFloat number

plural = (count, options) ->
  return false if options.length isnt 3

  count = Math.abs(count) % 100
  rest  = count % 10

  return options[2] if count > 10 and count < 20
  return options[1] if rest > 1 and rest < 5
  return options[0] if rest is 1

  options[2]

parseNumber = (number, count) ->
  numeral = ''

  if number.length is 3
    first  = number.substr 0, 1
    number = number.substr 1, 3

    numeral = "#{words[2][first]} "

  if number < 20
    numeral += "#{words[0][toFloat(number)]} "
  else
    first  = number.substr 0, 1
    second = number.substr 1, 2

    numeral += "#{words[1][first]} #{words[0][second]} "

  switch count
    when 0
      numeral += plural number, ['рубль', 'рубля', 'рублей']

    when 1
      if numeral isnt '  '
        numeral += plural number, ['тысяча ', 'тысячи ', 'тысяч ']

        numeral = numeral.replace 'один ', 'одна '
        numeral = numeral.replace 'два ', 'две '

    when 2
      if numeral isnt '  '
        numeral += plural number, ['миллион ', 'миллиона ', 'миллионов ']

    when 3
      numeral += plural number, ['миллиард ', 'миллиарда ', 'миллиардов ']

  numeral

parseDecimals = (number) ->
  text = plural number, ['копейка', 'копейки', 'копеек']

  if number is 0
    number = "00"
  else if number < 10
    number = "0#{number}"

  " #{number} #{text}"

rubles = (number) ->
  return false if not number or number is 0

  if typeof number isnt 'number'
    number = toFloat number.replace ',', '.'
    return false if isNaN number

  number = number.toFixed 2

  [number, decimals] = number.split '.' if number.indexOf('.') isnt -1

  numeral = ''
  length = number.length - 1
  parts = ''
  count = 0

  while length >= 0
    digit = number.substr length, 1
    parts = digit + parts

    if (parts.length is 3 or length is 0) and not isNaN toFloat parts
      numeral = parseNumber(parts, count) + numeral

      parts = ''
      count++

    length--

  numeral = numeral.replace /\s+/g, ' '
  numeral += parseDecimals toFloat decimals if decimals
  numeral

(exports or window).rubles = rubles
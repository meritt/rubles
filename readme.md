# rubles — стоимость прописью

[![NPM version][npm-image]][npm-url]
[![Build status][github-actions-image]][github-actions-url]
[![Coverage status][coveralls-image]][coveralls-url]
[![Dependency status][libraries-image]][libraries-url]

Преобразует денежную сумму в строку прописью на русском языке: `12.1` превращается в «двенадцать рублей 10 копеек». Поддерживает российские и белорусские рубли. ESM-модуль без зависимостей, работает на сервере и в браузере.

## Требования

Node.js ≥ 24. В браузере — любой сборщик с поддержкой ESM (Vite, webpack, esbuild).

## Установите пакет

```bash
pnpm add rubles
# или: npm install rubles
```

## Используйте

Единственный именованный экспорт — функция `rubles`:

```js
import { rubles } from 'rubles';

let text = rubles(12.1);
console.log(text); // двенадцать рублей 10 копеек

let text = rubles('52151,31');
console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка
```

В CommonJS пакет подключается через нативный `require(ESM)`:

```js
const { rubles } = require('rubles');
```

Отдельный браузерный бандл не поставляется. В браузере импортируйте пакет как обычный ESM-модуль — сборщик включит его в вашу сборку.

## Сигнатура

```
rubles(input, currencyCode?) → string | null
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `input` | `number` \| `string` | Сумма в рублях. Целая часть — рубли, дробная — копейки |
| `currencyCode` | `string` | Необязательный. Значение `'BYN'` переключает на белорусские рубли |

Функция возвращает строку прописью либо `null`, если вход невалиден.

Формат результата: рубли прописью, название валюты, копейки двузначным числом и слово «копейка» в нужной форме. Копейки выводятся цифрами с ведущим нулём, а не прописью:

```js
let text = rubles(1.05);
console.log(text); // один рубль 05 копеек
```

Числительные склоняются по числу — для рублей, копеек, тысяч, миллионов и миллиардов.

## Белорусские рубли

Передайте `'BYN'` вторым аргументом:

```js
let text = rubles(44.2, 'BYN');
console.log(text); // сорок четыре белорусских рубля 20 копеек

let text = rubles(1, 'BYN');
console.log(text); // один белорусский рубль 00 копеек
```

## Тестирование

```bash
pnpm test
```

## Автор

[Алексей Симоненко](https://github.com/meritt)

## Лицензия

MIT. Смотрите файл `LICENSE`.

[npm-image]: https://img.shields.io/npm/v/rubles.svg?style=flat
[npm-url]: https://www.npmjs.com/package/rubles
[github-actions-image]: https://github.com/meritt/rubles/actions/workflows/ci.yml/badge.svg
[github-actions-url]: https://github.com/meritt/rubles/actions/workflows/ci.yml
[coveralls-image]: https://coveralls.io/repos/github/meritt/rubles/badge.svg?branch=main
[coveralls-url]: https://coveralls.io/github/meritt/rubles?branch=main
[libraries-image]: https://img.shields.io/librariesio/release/npm/rubles.svg?style=flat
[libraries-url]: https://libraries.io/npm/rubles

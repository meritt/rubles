## rubles.js — стоимость прописью

[![NPM version](https://badge.fury.io/js/rubles.svg)](http://badge.fury.io/js/rubles) [![Build Status](https://travis-ci.org/meritt/rubles.svg?branch=master)](https://travis-ci.org/meritt/rubles) [![Coverage Status](https://coveralls.io/repos/meritt/rubles/badge.png?branch=master)](https://coveralls.io/r/meritt/rubles?branch=master) [![devDependency Status](https://david-dm.org/meritt/rubles/dev-status.svg?theme=shields.io)](https://david-dm.org/meritt/rubles#info=devDependencies)

В российском документообороте принято писать сумму прописью. Такое должно быть в договорах, актах, расписках и других подобных документах. Rubles.js призван решить эту проблему комплексно, он работает в браузере и на серверной стороне.

### На сервере

#### Установить через [npm](//npmjs.org)

```bash
$ npm install rubles
```

#### Использовать в JavaScript

```js
var rubles = require('rubles').rubles;

var text = rubles(12.10);
console.log(text); // двенадцать рублей 10 копеек

var text = rubles("52151,31");
console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка
```

#### Использовать в CoffeeScript

```coffeescript
{rubles} = require 'rubles'

text = rubles 1000.32
console.log text # одна тысяча рублей 32 копейки

text = rubles "2000000,1"
console.log text # два миллиона рублей 10 копеек
```

----------------

### В браузере

#### Установить через [bower](http://bower.io)

```bash
$ bower install rubles --save
```

#### Подключить

```html
<script src="components/rubles/lib/rubles.min.js"></script>
```

#### Использовать

```html
<script>
var text = rubles(12.10);
console.log(text); // двенадцать рублей 10 копеек

var text = rubles("52151,31");
console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка
</script>
```

----------------

### Нашли ошибку?

Пожалуйста, создайте тикет — https://github.com/meritt/rubles/issues

### Тестирование

Для запуска тестов обновите репозиторий и запустите:

```bash
$ npm test
```

## Автор

* [Алексей Симоненко](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)

## Лицензия

Лицензия MIT, смотрите файл `license.md`.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/meritt/rubles/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
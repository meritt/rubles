# rubles.js — стоимость прописью

[![NPM version][npm-image]][npm-url]
[![Build status][github-actions-image]][github-actions-url]
[![devDependency status][devdependency-image]][devdependency-url]

В российском документообороте принято писать сумму прописью. Такое должно быть в договорах, актах, расписках и других подобных документах. Rubles.js призван решить эту проблему комплексно, он работает в браузере и на серверной стороне.

### На сервере

#### Установить через [npm](//npmjs.org)

```bash
$ npm i --save rubles
```

#### Как использовать

```js
var rubles = require('rubles').rubles;

var text = rubles(12.1);
console.log(text); // двенадцать рублей 10 копеек

var text = rubles('52151,31');
console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка
```

---

### В браузере

#### Использовать

```html
<script>
  var text = rubles(12.1);
  console.log(text); // двенадцать рублей 10 копеек

  var text = rubles('52151,31');
  console.log(text); // пятьдесят две тысячи сто пятьдесят один рубль 31 копейка
</script>
```

---

### Нашли ошибку?

Пожалуйста, создайте тикет — https://github.com/meritt/rubles/issues

### Тестирование

Для запуска тестов обновите репозиторий и запустите:

```bash
$ npm test
```

## Автор

- [Алексей Симоненко](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)

## Лицензия

Лицензия MIT, смотрите файл `license.md`.

[npm-image]: https://img.shields.io/npm/v/rubles.svg?style=flat
[npm-url]: https://www.npmjs.com/package/rubles
[github-actions-image]: https://github.com/meritt/rubles/actions/workflows/ci.yml/badge.svg
[github-actions-url]: https://github.com/meritt/rubles/actions/workflows/ci.yml
[devdependency-image]: https://img.shields.io/david/dev/meritt/rubles.svg?style=flat
[devdependency-url]: https://david-dm.org/meritt/rubles#info=devDependencies

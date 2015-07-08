EveEmi
===

[![npm](https://img.shields.io/npm/v/@isoden/eveemi.svg?style=flat-square)](https://www.npmjs.com/package/@isoden/eveemi)

## Installation

```
$ npm install @isoden/eveemi --save
```

## Usage

```js
var Model = function () {
  EveEmi.apply(this, arguments);

  this.attrs = {};
};
Model.prototype = new EveEmi();

Model.prototype.set = function (key, value) {
  this.attrs[key] = value;
  this.trigger('set');
};

var model = new Model();

model.on('set', function () {
  alert('set!');
});

model.set('name', 'isoden'); // alert: 'set!'

```


## API

### on(type: string, callback: function[, ctx: object, once: boolean = false])
### once(type: string, callback: function[, ctx: object])
### off(type: string, func: function)
### listenTo(target: EveEmi, type: string, callback: function[, ctx: object, once: boolean = false])
### listenToOnce(target: EveEmi, type: string, callback: function[, ctx: object])
### trigger(type: string, [...args])

## License

MIT License
http://isoden.mit-license.org

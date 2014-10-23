EveEmi
===

JSプラグイン作成用gulpタスク

##usage

```js
var obj = new EveEmi;
obj.set = function (key, value) {
    this[key] = value;
    this.trigger('set');
};
obj.on('set', function () {
    alert('set!');
});

obj.set('name', 'isoden'); // alert: 'set!'

```
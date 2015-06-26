/**
 * test.eveemi.js
 */

'use strict';

var EveEmi = require('../dest/eveemi');
var assert = require('power-assert');

describe('メソッドのテスト', function () {
  var eveemi;

  beforeEach(function () {
    eveemi = new EveEmi();
  });

  it('onでコールバックが登録できる', function () {
    eveemi.on('test', function () {});

    assert(Array.isArray(eveemi._allListener.test));
  });

  it('triggerでコールバックが発火する', function () {
    var executed = false;
    eveemi.on('test', function () {
      executed = true;
    });
    eveemi.trigger('test');

    assert(executed);
  });

  it('triggerで引数を渡せる', function () {
    var a, b, c;

    eveemi.on('test', function (_a, _b, _c) {
      a = _a;
      b = _b;
      c = _c;
    });
    eveemi.trigger('test', 1, 2, 3);

    assert(a = 1);
    assert(b = 2);
    assert(c = 3);
  });
});

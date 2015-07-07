/**
 * test.eveemi.js
 */

'use strict';

var EveEmi = require('../');
var assert = require('chai').assert;

describe('メソッドのテスト', function () {
  var eveemi;
  var eveemi2;
  var executed;
  var execCount;

  beforeEach(function () {
    eveemi    = new EveEmi();
    eveemi2   = new EveEmi();
    executed  = false;
    execCount = 0;
  });

  it('onでコールバックが登録できる', function () {
    eveemi.on('test', function () {});

    assert(Array.isArray(eveemi._allListener.test));
  });

  it('triggerでコールバックが発火する', function () {
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

  it('onceで一度だけコールバックが発火する', function () {
    eveemi.once('test', function () {
      execCount += 1;
    });
    eveemi.trigger('test');
    eveemi.trigger('test');
    eveemi.trigger('test');
    eveemi.trigger('test');
    assert(execCount === 1);
  });

  it('offで購読を解除できる', function () {
    function plpl() {
      execCount += 1;
    }
    eveemi.on('test', plpl);
    eveemi.trigger('test');
    eveemi.off('test', plpl);
    eveemi.trigger('test');

    assert(execCount === 1);
  });

  it('stopListeningで購読を解除できる', function () {
    function plpl() {
      execCount += 1;
    }

    eveemi.listenTo(eveemi2, 'test', plpl);
    eveemi2.trigger('test');
    eveemi.stopListening(eveemi2, 'test', plpl);
    eveemi2.trigger('test');

    assert(execCount === 1);
  });
});

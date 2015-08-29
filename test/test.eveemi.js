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
  var noop = function () {};

  beforeEach(function () {
    eveemi    = new EveEmi();
    eveemi2   = new EveEmi();
    executed  = false;
    execCount = 0;
  });

  it('onでコールバックが登録できる', function () {
    // 最初はなにも登録されていないので0
    assert(eveemi._allListener.length === 0);

    // 1つ登録したら増える
    eveemi.on('test', noop);
    assert(eveemi._allListener.length === 1);

    // もう１つ登録しても増える
    eveemi.on('test', noop);
    assert(eveemi._allListener.length === 2);
  });

  it('triggerでコールバックが発火する', function () {
    eveemi.on('test', function () {
      executed = true;
    });

    // この段階では実行されていない
    assert(!executed);

    // 別のイベント名では実行されない
    eveemi.trigger('foo');
    assert(!executed);

    // 登録したイベント名と同じなので実行される
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
    assert(a === 1 && b === 2 && c === 3);
  });

  it('onceで一度だけコールバックが発火する', function () {
    eveemi.once('test', function () {
      execCount += 1;
    });

    // 何度triggerしても実行されるのは1度
    eveemi.trigger('test');
    eveemi.trigger('test');
    eveemi.trigger('test');
    eveemi.trigger('test');
    assert(execCount === 1);
  });

  it('listenTo', function () {
    eveemi.listenTo(eveemi2, 'test', function () {
      executed = true;
    });

    assert(!executed);

    eveemi.trigger('test');

    assert(!executed);

    eveemi2.trigger('test');

    assert(executed);
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

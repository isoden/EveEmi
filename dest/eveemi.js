
/*!
 * @isoden/eveemi v1.1.2
 * https://github.com/isoden/EveEmi.git
 *
 * Copyright (c) 2015 YU ISODA
 * Licensed under the MIT license.
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EveEmi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// ユーティリティ関数をインポート

var _utility = require('./utility');

var EveEmi = (function () {
  /**
   * 初期化処理
   * @constructor
   */

  function EveEmi() {
    _classCallCheck(this, EveEmi);

    this._allListener = {};
  }

  _createClass(EveEmi, [{
    key: 'on',

    /**
     * イベント登録
     * @method on
     * @param  {String}   type
     * @param  {Function} callback
     * @param  {Object}   ctx
     * @param  {Boolean}  once
     * @public
     */
    value: function on(type, callback, ctx) {
      var _this = this;

      var once = arguments[3] === undefined ? false : arguments[3];

      // イベントが2個以上指定されている場合
      if (/\s/.test((0, _utility.trim)(type))) {
        var types = (0, _utility.trim)(type).split(' ');
        return (0, _utility.forEach)(types, function (_type) {
          return _this.on(_type, callback, ctx, once);
        });
      }

      if (!this._allListener[type]) {
        this._allListener[type] = [];
      }

      this._allListener[type].push({
        ctx: ctx,
        once: once,
        callback: callback
      });
    }
  }, {
    key: 'listenTo',
    value: function listenTo(target, type, callback, ctx, once) {
      target.on(type, callback, ctx, once);
    }
  }, {
    key: 'listenToOnce',
    value: function listenToOnce(target, type, callback, ctx) {
      this.listenTo(target, type, callback, ctx, true);
    }
  }, {
    key: 'stopListening',
    value: function stopListening(target, type, func) {
      target.off(type, func);
    }
  }, {
    key: 'off',

    /**
     * イベント解除
     * @method off
     * @param {String}   type
     * @param {Function} func
     * @public
     */
    value: function off(type, func) {
      var _this2 = this;

      if (!this._allListener[type]) {
        return;
      }

      this._each(type, function (o, i) {
        if (func === o.callback) {
          _this2._allListener[type].splice(i, 1);
        }
      });
    }
  }, {
    key: 'once',

    /**
     * 一回だけ実行される
     * @method once
     * @param  {String}   type
     * @param  {Function} callback
     * @param  {Object}   ctx
     * @public
     */
    value: function once(type, callback, ctx) {
      this.on(type, callback, ctx, true);
    }
  }, {
    key: 'trigger',

    /**
     * イベントを発火させる
     * @method trigger
     * @param {String} type
     * @param {Any}    args callbackに渡す引数(可変長引数)
     * @public
     */
    value: function trigger(type) {
      var _this3 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this._allListener[type]) {
        return;
      }

      this._each(type, function (o) {
        o.callback.apply(o.ctx, args);
        if (o.once) {
          _this3.off(type, o.callback);
        }
      });
    }
  }, {
    key: '_each',

    /**
     * リスナーのイテレータ
     * @method each
     * @param {String}           type
     * @param {Function}         callback
     * @param {Object|Undefined} ctx
     * @protected
     */
    value: function _each(type, callback, ctx) {
      (0, _utility.forEach)(this._allListener[type], callback, ctx);
    }
  }]);

  return EveEmi;
})();

exports['default'] = EveEmi;
module.exports = exports['default'];

},{"./utility":2}],2:[function(require,module,exports){
/**
 * utility.js
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.forEach = forEach;
exports.trim = trim;

function forEach(arr, callback, ctx) {
  var i = 0;
  var max = arr.length;

  for (; i < max; i += 1) {
    callback.call(ctx, arr[i], i, arr);
  }
}

function trim(str) {
  // refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return ('' + str).replace(rtrim, '');
}

},{}]},{},[1])(1)
});


//# sourceMappingURL=eveemi.js.map
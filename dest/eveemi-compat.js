
/*!
 * @isoden/eveemi-compat v1.1.2
 * https://github.com/isoden/EveEmi.git
 *
 * Copyright (c) 2015 YU ISODA
 * Licensed under the MIT license.
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EveEmi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

exports.__esModule = true;

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

  /**
   * イベント登録
   * @method on
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @param  {Boolean}  once
   * @public
   */

  EveEmi.prototype.on = function on(type, callback, ctx) {
    var _this = this;

    var once = arguments[3] === undefined ? false : arguments[3];

    // イベントが2個以上指定されている場合
    if (/\s/.test(_utility.trim(type))) {
      var types = _utility.trim(type).split(' ');
      return _utility.forEach(types, function (_type) {
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
  };

  /**
   * targetオブジェクトのイベントを購読する
   * @method listenTo
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @param  {Boolean}  once
   * @public
   */

  EveEmi.prototype.listenTo = function listenTo(target, type, callback, ctx, once) {
    target.on(type, callback, ctx, once);
  };

  /**
   * targetオブジェクトのイベントを一度だけ購読する
   * @method listenToOnce
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @public
   */

  EveEmi.prototype.listenToOnce = function listenToOnce(target, type, callback, ctx) {
    this.listenTo(target, type, callback, ctx, true);
  };

  /**
   * targetオブジェクトのイベントを解除する
   * @method stopListening
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @public
   */

  EveEmi.prototype.stopListening = function stopListening(target, type, func) {
    target.off(type, func);
  };

  /**
   * イベント解除
   * @method off
   * @param {String}   type
   * @param {Function} func
   * @public
   */

  EveEmi.prototype.off = function off(type, func) {
    var _this2 = this;

    if (!this._allListener[type]) {
      return;
    }

    this._each(type, function (o, i) {
      if (func === o.callback) {
        _this2._allListener[type].splice(i, 1);
      }
    });
  };

  /**
   * 一回だけ実行される
   * @method once
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @public
   */

  EveEmi.prototype.once = function once(type, callback, ctx) {
    this.on(type, callback, ctx, true);
  };

  /**
   * イベントを発火させる
   * @method trigger
   * @param {String} type
   * @param {Any}    args callbackに渡す引数(可変長引数)
   * @public
   */

  EveEmi.prototype.trigger = function trigger(type) {
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
  };

  /**
   * リスナーのイテレータ
   * @method each
   * @param {String}           type
   * @param {Function}         callback
   * @param {Object|Undefined} ctx
   * @protected
   */

  EveEmi.prototype._each = function _each(type, callback, ctx) {
    _utility.forEach(this._allListener[type], callback, ctx);
  };

  return EveEmi;
})();

exports['default'] = EveEmi;
module.exports = exports['default'];

},{"./utility":2}],2:[function(require,module,exports){
/**
 * utility.js
 */

'use strict';

exports.__esModule = true;
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


//# sourceMappingURL=eveemi-compat.js.map
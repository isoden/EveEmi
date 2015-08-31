/*!
 * EveEmi.js v1.1.4
 * https://github.com/isoden/EveEmi.git
 *
 * Copyright (c) 2015 YU ISODA
 * Licensed under the MIT license.
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EveEmi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * eveemi.ts
 */
// ユーティリティ関数をインポート
var utility_1 = require('./utility');
var EveEmi = (function () {
    /**
     * 初期化処理
     */
    function EveEmi() {
        this._allListener = [];
    }
    /**
     * イベントを購読する
     */
    EveEmi.prototype.on = function (type, callback, ctx, once) {
        var _this = this;
        if (once === void 0) { once = false; }
        type = utility_1.trim(type);
        // イベントが2個以上指定されている場合
        if (/\s/.test(type)) {
            var types = type.split(' ');
            return utility_1.forEach(types, function (_type) { return _this.on(_type, callback, ctx, once); });
        }
        this._allListener.push({ ctx: ctx, type: type, once: once, callback: callback });
    };
    /**
     * targetのイベントを購読する
     */
    EveEmi.prototype.listenTo = function (target, type, callback, ctx, once) {
        if (once === void 0) { once = false; }
        target.on(type, callback, ctx, once);
    };
    /**
     * targetのイベントを一度だけ購読する
     */
    EveEmi.prototype.listenToOnce = function (target, type, callback, ctx) {
        this.listenTo(target, type, callback, ctx, true);
    };
    /**
     * targetのイベント購読を取り消す
     */
    EveEmi.prototype.stopListening = function (target, type, func) {
        target.off(type, func);
    };
    /**
     * イベント購読を取り消す
     */
    EveEmi.prototype.off = function (type, func) {
        var _this = this;
        utility_1.forEach(this._allListener, function (_a, i) {
            var ctx = _a.ctx, type = _a.type, once = _a.once, callback = _a.callback;
            if (func !== callback)
                return;
            _this._allListener.splice(i, 1);
        });
    };
    /**
     * イベントを一回だけ購読する
     */
    EveEmi.prototype.once = function (type, callback, ctx) {
        this.on(type, callback, ctx, true);
    };
    /**
     * イベントを発火させる
     */
    EveEmi.prototype.trigger = function (_type) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        utility_1.forEach(this._allListener, function (_a) {
            var ctx = _a.ctx, type = _a.type, once = _a.once, callback = _a.callback;
            if (type !== _type)
                return;
            callback.apply(ctx, args);
            if (!once)
                return;
            _this.off(_type, callback);
        });
    };
    return EveEmi;
})();
module.exports = EveEmi;

},{"./utility":2}],2:[function(require,module,exports){
/**
 * utility.js
 */
function forEach(arr, callback, ctx) {
    var i = 0;
    var max = arr.length;
    for (; i < max; i += 1) {
        callback.call(ctx, arr[i], i, arr);
    }
}
exports.forEach = forEach;
function trim(str) {
    // refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return str.replace(rtrim, '');
}
exports.trim = trim;

},{}]},{},[1])(1)
});


//# sourceMappingURL=eveemi.js.map
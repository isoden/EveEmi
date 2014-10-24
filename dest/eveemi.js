/*!
 * EveEmi v1.0.0
 * https://github.com/isoden/EveEmi.git
 *
 * Copyright (c) 2014 YU ISODA
 * Licensed under the MIT license.
 */

;(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('EveEmi', [], factory());
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.EveEmi = factory();
    }
})(this, function () {
    var slice, hasProp, each, mixin, EveEmi;

    // shortcut native method
    slice   = Array.prototype.slice;
    hasProp = Object.prototype.hasOwnProperty;

    /**
     * リストのイテレータ
     *
     * @param {array|object}
     * @param {callback}
     */
    each = function (list, callback) {
        var i   = 0,
            max = list.length;
        for (; i < max; i += 1) {
            callback.call(list[i], list[i], i);
        }
    };

    /**
     * _.extend的な
     *
     * @param {object} 拡張されるのオブジェクト
     * @param {object} 追加されるプロパティ
     * @return base
     */
    mixin = function (base, obj) {
        var i;
        for (i in obj) if (hasProp.call(obj, i)) {
            base[i] = obj[i];
        }
        return base[i];
    };

    EveEmi = (function () {
        function EveEmi() {
            // initialize
            this._init();
        }

        EveEmi.fn = EveEmi.prototype;

        mixin(EveEmi.fn, {
            /**
             * イベント登録
             *
             * @param {string}
             * @param {function}
             * @param {any}
             */
            on: function (type, callback, context) {
                if (!this._events[type]) {
                    this._events[type] = [];
                }

                this._events[type].push({
                    callback: callback,
                    context: context || this
                });
                return this;
            },

            /**
             * イベント解除
             *
             * @param {string}
             * @param {func}
             */
            off: function (type, func) {
                var _this = this;

                if (!this._events[type]) {
                    return;
                }

                each(this._events[type], function (o, i) {
                    if (func === o.callback) {
                        _this._events[type].splice(i, 1);
                    }
                });
            },

            /**
             * 一回だけ実行される
             *
             * @param {string}
             * @param {function}
             * @param {context}
             */
            once: function (type, callback, context) {
                if (!this._events[type]) {
                    this._events[type] = [];
                }

                this._events[type].push({
                    callback: callback,
                    context: context,
                    once: true
                });
            },

            /**
             * イベントを発火させる
             *
             * @param {string}
             * @param {any} type以降に可変長引数を取る
             */
            trigger: function (type) {
                var _this = this;
                var args  = slice.call(arguments, 1);

                if (!this._events[type]) {
                    return;
                }

                each(this._events[type], function (o, i) {
                    o.callback.apply(o.context, args);
                    if (o.once) {
                        _this.off(type, o.callback);
                    }
                });
            },

            /**
             * this._eventsを初期化する
             */
            _init: function () {
                this._events = {};
            }
        });

        return EveEmi;
    })();
    return EveEmi;
});
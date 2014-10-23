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

    slice   = Array.prototype.slice;
    hasProp = Object.prototype.hasOwnProperty;
    each    = function (list, callback) {
        var i   = 0,
            max = list.length;
        for (; i < max; i += 1) {
            callback.call(list[i], list[i], i);
        }
    };
    mixin   = function (base, obj) {
        var i;
        for (i in obj) if (hasProp.call(obj, i)) {
            base[i] = obj[i];
        }
        return base[i];
    };

    EveEmi = (function () {
        function EveEmi() {
            this._init();
        }
        EveEmi.fn = EveEmi.prototype;

        mixin(EveEmi.fn, {
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
            off: function (type, callback) {
                var _this = this;

                if (!this._events[type]) {
                    return;
                }

                each(this._events[type], function (o, i) {
                    if (callback === o.callback) {
                        _this._events[type].splice(i, 1);
                    }
                });
            },
            trigger: function (type) {
                var args = slice.call(arguments, 1);

                if (!this._events[type]) {
                    return;
                }

                each(this._events[type], function (o, i) {
                    o.callback.apply(o.context, args);
                });
            },
            _init: function () {
                this._events = {};
            }
        });

        return EveEmi;
    })();
    return EveEmi;
});
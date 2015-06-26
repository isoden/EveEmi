'use strict';
var EveEmi = require('../dest/eveemi');
var assert = require('power-assert');
describe('\u30E1\u30BD\u30C3\u30C9\u306E\u30C6\u30B9\u30C8', function () {
    var eveemi;
    beforeEach(function () {
        eveemi = new EveEmi();
    });
    it('on\u3067\u30B3\u30FC\u30EB\u30D0\u30C3\u30AF\u304C\u767B\u9332\u3067\u304D\u308B', function () {
        eveemi.on('test', function () {
        });
        assert(assert._expr(assert._capt(assert._capt(Array, 'arguments/0/callee/object').isArray(assert._capt(assert._capt(assert._capt(eveemi, 'arguments/0/arguments/0/object/object')._allListener, 'arguments/0/arguments/0/object').test, 'arguments/0/arguments/0')), 'arguments/0'), {
            content: 'assert(Array.isArray(eveemi._allListener.test))',
            filepath: '/Users/isodayuu/Repositories/EveEmi/test/test.eveemi.js',
            line: 20
        }));
    });
    it('trigger\u3067\u30B3\u30FC\u30EB\u30D0\u30C3\u30AF\u304C\u767A\u706B\u3059\u308B', function () {
        var executed = false;
        eveemi.on('test', function () {
            executed = true;
        });
        eveemi.trigger('test');
        assert(assert._expr(assert._capt(executed, 'arguments/0'), {
            content: 'assert(executed)',
            filepath: '/Users/isodayuu/Repositories/EveEmi/test/test.eveemi.js',
            line: 30
        }));
    });
    it('trigger\u3067\u5F15\u6570\u3092\u6E21\u305B\u308B', function () {
        var a, b, c;
        eveemi.on('test', function (_a, _b, _c) {
            a = _a;
            b = _b;
            c = _c;
        });
        eveemi.trigger('test', 1, 2, 3);
        assert(assert._expr(assert._capt(a = 1, 'arguments/0'), {
            content: 'assert(a = 1)',
            filepath: '/Users/isodayuu/Repositories/EveEmi/test/test.eveemi.js',
            line: 43
        }));
        assert(assert._expr(assert._capt(b = 2, 'arguments/0'), {
            content: 'assert(b = 2)',
            filepath: '/Users/isodayuu/Repositories/EveEmi/test/test.eveemi.js',
            line: 44
        }));
        assert(assert._expr(assert._capt(c = 3, 'arguments/0'), {
            content: 'assert(c = 3)',
            filepath: '/Users/isodayuu/Repositories/EveEmi/test/test.eveemi.js',
            line: 45
        }));
    });
});
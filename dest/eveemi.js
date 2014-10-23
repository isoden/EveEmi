/*!
 * gulp-javascript-plugin-template v1.0.0
 * https://github.com/isoden/
 *
 * Copyright (c) 2014 YU ISODA
 * Licensed under the MIT license.
 */

;(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('EveEmi', [], factory());
    } else if (typeof module !== 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.EveEmi = factory();
    }
})(this, function () {
    var EveEmi = (function () {
    })();
    return EveEmi;
});
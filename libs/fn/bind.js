/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: fn/bind.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('lang.merge');

/** 
 * 为对象绑定方法和作用域
 * @name bind
 * @function
 */
Function.prototype.bind = function(context) {
    if (arguments.length < 2 && J.isUndefined(arguments[0])) return this;
    var m = this, args = J.slice.call(arguments, 1);
    return function() {
        var a = J.merge(args, arguments);
        return m.apply(context, a);
    }
};

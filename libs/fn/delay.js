/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: fn/delay.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */


/** 
 * 扩展Function，延迟执行
 * @name delay
 * @function
 *
 */
Function.prototype.delay = function(timeout){
    var m = this, args = J.slice.call(arguments, 1);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
        return m.apply(m, args);
    }, timeout);
};
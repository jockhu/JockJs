/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: fn/methodize.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/15
 *
 */


/**
 * methodize
 *
 *
 *
 */
Function.prototype.methodize = function(){
    if (this.md) return this.md;
    var m = this;
    return this.md = function() {
        return m.apply(null, [this].concat(J.slice.call(arguments)));
    };
};

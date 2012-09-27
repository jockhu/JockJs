/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/type.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/31
 *
 */



/// require('lang.lang');
/// require('lang.each');

/**
 * 判断对象类型。
 *
 *         普通typeof array 也会返回object，本函数判断较准确
 *
 * @grammar J.type(object)
 *
 * @name J.object.type
 * @param {Object} o 需要判断的对象
 * @return {Type}
 *
 */
(function(J){
    var c2t = {};
    J.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        c2t[ "[object " + name + "]" ] = name.toLowerCase();
    });
    J.type = function( o ) {
        return o == null ? String( o ) : c2t[ Object.prototype.toString.call(o) ] || "object";
    };
})(J);
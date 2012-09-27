/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isString.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('lang.lang');


/**
 * 判断对象是否为字符串
 *
 * @grammar J.isString(object)
 *
 * @name J.lang.isString
 * @param {Object} o 需要判断的对象
 * @return {Boolean}
 *
 */

J.isString = J.lang.isString = function( o ) {
    return "string" === typeof o;
};
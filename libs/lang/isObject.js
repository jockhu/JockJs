/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isObject.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('lang.lang');
/// require('lang.type');


/**
 * 判断是否为对象
 *
 * @grammar J.isObject(object)
 *
 * @name J.lang.isObject
 * @param {Object} o 需要判断的对象
 * @return {Boolean}
 *
 */

J.isObject = J.lang.isObject = function( o ) {
    return "object" === J.type(o);
};
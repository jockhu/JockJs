/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isArray.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('lang.lang');
/// require('lang.type');


/**
 * 判断对象是否为数组
 *
 * @grammar J.isArray(object)
 *
 * @name J.lang.isArray
 * @param {Object} o 需要判断的对象
 * @return {Boolean}
 *
 */

J.isArray = J.lang.isArray = Array.isArray || function( o ) {
    return "array" === J.type(o);
};
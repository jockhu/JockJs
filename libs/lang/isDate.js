/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isDate.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/31
 *
 */



/// require('lang.lang');
/// require('lang.type');


/**
 * 判断对象是否为日期
 *
 * @grammar J.lang.isDate(object)
 *
 * @name J.lang.isDate
 * @param {Object} o 需要判断的对象
 * @return {Boolean}
 *
 */

J.isDate = J.lang.isDate = function( o ) {
    return "date" === J.type(o);
};
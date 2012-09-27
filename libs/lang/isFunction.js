/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isFunction.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('lang.lang');

/**
 * 判断对象是否为函数
 *
 * @grammar J.isFunction(object)
 *
 * @name J.isFunction
 * @param {Object} object 需要判断的对象
 * @return {Boolean}
 *
 */

J.isFunction = J.lang.isFunction = function (object) {
	return '[object Function]' == Object.prototype.toString.call(object);
};
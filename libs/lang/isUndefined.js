/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isUndefined.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('lang.lang');

/**
 * 判断对象是否未定义
 *
 * @grammar J.isUndefined(object)
 *
 * @name J.isUndefined
 * @param {Object} object 需要判断的对象
 * @return {Boolean}
 *
 */

J.isUndefined = J.lang.isUndefined = function (object) {
	return typeof object == "undefined";
};
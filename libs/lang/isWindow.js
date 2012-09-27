/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isWindow.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/05/30
 *
 */



/// require('lang.lang');


/**
 * 判断对象是否为window对象
 *
 * @grammar J.isWindow(object)
 *
 * @name J.lang.isWindow
 * @param {Object} object 需要判断的对象
 * @return {Boolean}
 *
 */

J.isWindow = J.lang.isWindow = function( object ) {
	return object && typeof object === "object" && "setInterval" in object;
};
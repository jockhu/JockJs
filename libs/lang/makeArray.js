/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/makeArray.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');
/// require('lang.type');
/// require('lang.isWindow');
/// require('lang.merge');


/**
 * 制造数组，返回新对象。
 *
 * @grammar J.makeArray(array, results)
 *
 * @name J.lang.makeArray
 * @param {Array} array
 * @param {Object} results
 * @return {Object|Array}
 *
 */
J.makeArray = J.lang.makeArray = function( array, results ) {
	var ret = results || [];

	if ( array != null ) {
		var type = J.type( array );
		if ( array.length == null || type === "string" || type === "function" || type === "regexp" || J.isWindow( array ) ) {
			Array.prototype.push.call( ret, array );
		} else {
			J.merge( ret, array );
		}
	}

	return ret;
};
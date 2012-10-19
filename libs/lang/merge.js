/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/merge.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');


/**
 * 合并数组，返回新数组。
 *
 * @grammar J.merge(array, results)
 *
 * @name J.lang.merge
 * @param {Array} first
 * @param {Array} second
 * @return {Array}
 *
 */
J.merge = J.lang.merge = function( first, second ) {
	var i = first.length,
	    j = 0;
	if ( J.isNumber(second.length) ) {
	    for ( var l = second.length; j < l; j++ ) {
	        first[ i++ ] = second[ j ];
	    }
	} else {
	    while ( !J.isUndefined(second[j]) ) {
	        first[ i++ ] = second[ j++ ];
	    }
	}
	first.length = i;

	return first;
};
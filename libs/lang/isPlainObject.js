/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/isPlainObject.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/06/01
 *
 */



/// require('lang.lang');
/// require('lang.type');
/// require('lang.isWindow');

/**
 * 判断Object是否为纯对象。
 *
 * @grammar J.isPlainObject(obj)
 *
 * @name J.lang.isPlainObject
 * @param {Object} obj 需要判断的Object
 * @return {Boolean}
 *
 */
J.isPlainObject = J.lang.isPlainObject = function (obj) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if ( !obj || J.type(obj) !== "object" || obj.nodeType || J.isWindow( obj ) ) {
		return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty;

	try {
		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
	} catch ( e ) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.

	var key;
	for ( key in obj ) {}

	return key === undefined || hasOwn.call( obj, key );
};
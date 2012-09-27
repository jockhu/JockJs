/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/each.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');
/// require('lang.isFunction');


/**
 * 遍历Object中所有元素。
 *
 * @grammar J.each(object, function(item, key){})
 *
 * @name J.lang.each
 * @param {Object} object 需要遍历的Object
 * @param {Function} callback 对每个Object元素进行调用的函数，function (item, key)
 * @return {Object} 原对象
 *
 */
J.each = J.lang.each = function (object, callback) {
    var name, i = 0, length = object.length, isObj = length === undefined || J.isFunction(object);
    if (isObj) {
        for (item in object) {
            if (callback.call(object[ item ], item, object[ item ]) === false) {
                break;
            }
        }
    } else {
        for (; i < length;) {
            if (callback.call(object[ i ], i, object[ i++ ]) === false) {
                break;
            }
        }
    }
    return object;
};
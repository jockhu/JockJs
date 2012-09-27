/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/keys.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */


/// require('lang.lang');


/**
 * 获取目标对象的键名列表
 *
 * @grammar J.lang.keys(source)
 *
 * @name J.lang.keys
 * @param {Object} source 目标对象
 * @return {Array} 键名列表
 *
 */
J.keys = J.lang.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};
